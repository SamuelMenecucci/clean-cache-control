class LocalSavePurchases {
  constructor(private readonly cacheStore: CacheStore) {}

  async save(): Promise<void> {
    this.cacheStore.delete();
  }
}

interface CacheStore {
  delete: () => void;
}

class CacheStoreSpy implements CacheStore {
  deleteCallsCount = 0;

  delete(): void {
    this.deleteCallsCount++;
  }
}
type SutTypes = {
  sut: LocalSavePurchases;
  cacheStore: CacheStoreSpy;
};

const makeSut = (): SutTypes => {
  const cacheStore = new CacheStoreSpy();
  const sut = new LocalSavePurchases(cacheStore);
  return { sut, cacheStore };
};

describe("LocaSavePurchases", () => {
  test("Should not delete cache on sut.init", () => {
    const { cacheStore } = makeSut();
    new LocalSavePurchases(cacheStore);
    expect(cacheStore.deleteCallsCount).toBe(0);
  });
});

describe("LocaSavePurchases", () => {
  test("Should delete old cache on sut.init", async () => {
    const { cacheStore, sut } = makeSut();

    await sut.save();
    expect(cacheStore.deleteCallsCount).toBe(1);
  });
});
