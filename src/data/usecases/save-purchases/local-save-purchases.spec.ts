import { CacheStore } from "@/data/protocols/cache";
import { LocalSavePurchases } from "@/data/usecases";

class CacheStoreSpy implements CacheStore {
  deleteCallsCount = 0;
  insertCallsCount = 0;
  key: string;

  delete(key: string): void {
    this.deleteCallsCount++;
    this.key = key;
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

describe("LocaLSavePurchases", () => {
  test("Should not delete cache on sut.init", () => {
    const { cacheStore } = makeSut();
    new LocalSavePurchases(cacheStore);
    expect(cacheStore.deleteCallsCount).toBe(0);
  });
});

describe("LocalSavePurchases", () => {
  test("Should delete old cache on sut.init", async () => {
    const { cacheStore, sut } = makeSut();
    await sut.save();
    expect(cacheStore.deleteCallsCount).toBe(1);
    expect(cacheStore.key).toBe("purchases");
  });
});

describe("LocalSavePurchases", () => {
  test("Should not insert new Cache if delete fails", async () => {
    const { cacheStore, sut } = makeSut();
    jest.spyOn(cacheStore, "delete").mockImplementationOnce(() => {
      throw new Error();
    });
    const promise = sut.save();
    expect(cacheStore.insertCallsCount).toBe(0);
    expect(promise).rejects.toThrow();
  });
});
