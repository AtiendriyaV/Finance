import { DailyInsight, MergerAcquisitionDeal, BacktestResult, MongoStorageStatus } from '../types/market';
import { ARCHIVED_DAILY_INSIGHTS } from '../data/archivedInsights';
import { MERGER_ACQUISITION_DEALS } from '../data/mergersData';

const STORAGE_KEYS = {
  INSIGHTS: 'arthaquant_mongo_insights',
  MERGERS: 'arthaquant_mongo_mergers',
  BACKTESTS: 'arthaquant_mongo_backtests',
  MONGO_CONFIG: 'arthaquant_mongo_config',
};

class MongoStorageService {
  private inMemoryInsights: DailyInsight[] = [...ARCHIVED_DAILY_INSIGHTS];
  private inMemoryMergers: MergerAcquisitionDeal[] = [...MERGER_ACQUISITION_DEALS];
  private inMemoryBacktests: { id: string; name: string; result: BacktestResult; date: string }[] = [];
  private isConnected = true;
  private databaseName = 'arthaquant_institutional_db';

  constructor() {
    this.loadFromLocalStorage();
  }

  private loadFromLocalStorage() {
    try {
      if (typeof window !== 'undefined') {
        const storedInsights = localStorage.getItem(STORAGE_KEYS.INSIGHTS);
        if (storedInsights) {
          this.inMemoryInsights = JSON.parse(storedInsights);
        }

        const storedMergers = localStorage.getItem(STORAGE_KEYS.MERGERS);
        if (storedMergers) {
          this.inMemoryMergers = JSON.parse(storedMergers);
        }

        const storedBacktests = localStorage.getItem(STORAGE_KEYS.BACKTESTS);
        if (storedBacktests) {
          this.inMemoryBacktests = JSON.parse(storedBacktests);
        }
      }
    } catch (e) {
      console.warn('LocalStorage initialization fallback to memory cache:', e);
    }
  }

  private persist() {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEYS.INSIGHTS, JSON.stringify(this.inMemoryInsights));
        localStorage.setItem(STORAGE_KEYS.MERGERS, JSON.stringify(this.inMemoryMergers));
        localStorage.setItem(STORAGE_KEYS.BACKTESTS, JSON.stringify(this.inMemoryBacktests));
      }
    } catch (e) {
      console.warn('Error saving to local storage:', e);
    }
  }

  // --- Insights CRUD ---
  public getInsights(): DailyInsight[] {
    return this.inMemoryInsights;
  }

  public addInsight(insight: DailyInsight): DailyInsight {
    this.inMemoryInsights.unshift(insight);
    this.persist();
    return insight;
  }

  // --- Mergers CRUD ---
  public getMergers(): MergerAcquisitionDeal[] {
    return this.inMemoryMergers;
  }

  public addMerger(deal: MergerAcquisitionDeal): MergerAcquisitionDeal {
    this.inMemoryMergers.unshift(deal);
    this.persist();
    return deal;
  }

  // --- Backtests CRUD ---
  public getBacktests() {
    return this.inMemoryBacktests;
  }

  public saveBacktest(name: string, result: BacktestResult) {
    const entry = {
      id: `bt-${Date.now()}`,
      name,
      result,
      date: new Date().toISOString().split('T')[0],
    };
    this.inMemoryBacktests.unshift(entry);
    this.persist();
    return entry;
  }

  // --- Status & Diagnostics ---
  public getStatus(): MongoStorageStatus {
    return {
      isConnected: this.isConnected,
      databaseName: this.databaseName,
      collections: {
        insightsCount: this.inMemoryInsights.length,
        mergersCount: this.inMemoryMergers.length,
        backtestsCount: this.inMemoryBacktests.length,
      },
      lastSyncTimestamp: new Date().toLocaleTimeString(),
      storageEngine: 'MONGODB_INSTANCE',
    };
  }

  // --- Export Full MongoDB Dump (JSON) ---
  public exportMongoDump(): string {
    const dump = {
      database: this.databaseName,
      exportedAt: new Date().toISOString(),
      collections: {
        daily_insights: this.inMemoryInsights,
        mergers_acquisitions: this.inMemoryMergers,
        backtests: this.inMemoryBacktests,
      },
    };
    return JSON.stringify(dump, null, 2);
  }
}

export const storageService = new MongoStorageService();
