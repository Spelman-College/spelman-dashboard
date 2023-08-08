import { ApiCache } from './cache'


export class SeriesClient {
    private cache: ApiCache
    baseURI: string = 'https://api.datacommons.org/v1/observations/series'
    key: string
    entity: string

    constructor(entityDcid: string, key: string) {
	this.cache = new ApiCache()
	let entity = entityDcid
	if (entity.startsWith('/')) {
	    entity = entity.slice(1)
	}

	if (entity.endsWith('/')) {
	    entity = entity.slice(0, (entity.length - 1))
	}
	this.entity = entity
	this.key = key
    }

    mkURI(variableDcid: string): string {
	// https://docs.datacommons.org/api/rest/v1/observations/series
	return `${this.baseURI}/${this.entity}/${variableDcid}?key=${this.key}`
    }

    async getData(variableDcid: string): any {
	const request = this.mkURI(variableDcid)
	if (!this.cache.recordExists(request)) {
	    const res = await fetch(request);
	    const finalRes = await res.json();
	    this.cache.setRecord(request, finalRes);
	}
	return this.cache.getRecord(request).observations;
    }
}
