/* Shared local media library for the admin and portfolio preview. */
const PortfolioMedia = (() => {
  const DB_NAME = "ct-portfolio-media";
  const STORE = "files";
  const PREFIX = "admin-media:";
  let database;

  function open() {
    if (database) return database;
    database = new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, 1);
      request.onupgradeneeded = () => request.result.createObjectStore(STORE, { keyPath: "id" });
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
    return database;
  }
  function requestValue(request) {
    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
  async function put(file) {
    const id = crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    const db = await open();
    const transaction = db.transaction(STORE, "readwrite");
    transaction.objectStore(STORE).put({ id, name: file.name, type: file.type, blob: file });
    await new Promise((resolve, reject) => { transaction.oncomplete = resolve; transaction.onerror = () => reject(transaction.error); });
    return `${PREFIX}${id}`;
  }
  async function getUrl(reference) {
    if (!reference || !reference.startsWith(PREFIX)) return reference || null;
    const db = await open();
    const record = await requestValue(db.transaction(STORE, "readonly").objectStore(STORE).get(reference.slice(PREFIX.length)));
    return record ? URL.createObjectURL(record.blob) : null;
  }
  async function hydrate(projects) {
    const references = [...new Set(projects.flatMap((project) => [project.tileMedia, project.cover]).filter((value) => value?.startsWith?.(PREFIX)))];
    const entries = await Promise.all(references.map(async (reference) => [reference, await getUrl(reference)]));
    return new Map(entries.filter(([, url]) => url));
  }
  return { put, getUrl, hydrate, isReference: (value) => value?.startsWith?.(PREFIX) };
})();
