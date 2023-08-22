
type CacheResult = any;

export class ApiCache {
    protected cache: Map<string, any> = new Map();

    setRecord(url: string, result: any): void {
	if (!this.recordExists(url)) {
	    this.cache.set(url, result);
	}
    }

    getRecord(url: string): CacheResult | null {
	return this.cache.get(url);
    }

    recordExists(url: string): boolean {
	return !!this.cache.has(url);
    }
}
