import { Tour } from "../models/tour.model.js";

export class TourService {
    private apiUrl: string;

    constructor() {
        this.apiUrl= 'http://localhost:5105/api/tours'
    }

    getAll(): Promise<{ data: Tour[], totalCount: number }> {   
        
        const url = `${this.apiUrl}`;        
        return fetch(url)
            .then(response => {
                if (!response.ok) {
                    return response.text().then(errorMessage => {
                        throw {status: response.status, message: errorMessage}
                    })
                }
                return response.json()
            })
            .then((response: {data: Tour[], totalCount: number}) => {
                return response;
            })
            .catch(error => {
                console.error('Error:', error.status)
                throw error
            });
    }

    getById(id: string): Promise<Tour> {
            return fetch(`${this.apiUrl}/${id}`)
                .then(response => {                   
                    if (!response.ok) {
                        return response.text().then(errorMessage => {
                            throw { status: response.status, message: errorMessage }
                        })
                    }
                     console.log(response);
                    return response.json();
                    
                })   
                .then((tour: Tour) => {
                    return tour;
                })
                .catch(error => {
                    console.error('Error:', error.status)
                    throw error
                });
        }

    delete(id :string): Promise<{ data: Tour[], totalCount: number }> {   
        return fetch(`${this.apiUrl}/${id}`, {method: 'DELETE'})
            .then(response => {
                if (!response.ok) {
                    return response.text().then(errorMessage => {
                        throw { status: response.status, message: errorMessage }
                    })
                }
                const contentLength = response.headers.get('content-length');
                if (response.status === 204 || contentLength === '0') {
                    return; // nothing to return
                }
                return response.json()
                })
            .catch(error => {
                    const status = error.status ?? 'Network';
                    const message = error.message ?? error.toString();
                    console.error(`Error [${status}]: ${message}`);
                    throw { status, message }; // rethrow for UI to catch
            });   
    }

    update(id: string, formData: Tour): Promise<Tour> {
            return fetch(`${this.apiUrl}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })
                .then(response => {
                    if (!response.ok) {
                        return response.text().then(errorMessage => {
                            throw { status: response.status, message: errorMessage }
                        })
                    }
                    return response.json()
                })
                .then((tour: Tour) => {
                    return tour;
                })
                .catch(error => {
                    console.error('Error:', error.status)
                    throw error
                });
    }

    addNew(formData: Tour): Promise<Tour> {
        return fetch(this.apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
            .then(response => {
                if (!response.ok) {
                    return response.text().then(errorMessage => {
                        throw { status: response.status, message: errorMessage }
                    })
                }
                return response.json()
            })
            .then((tour: Tour) => {
                return tour;
            })
            .catch(error => {
                console.error('Error:', error.status)
                throw error
            });
    }

    getPaged(guideId?:string,page?:string,pageSize?: string, orderBy?: string,orderDirection?: string):Promise<Tour[]> {
       
        const queryParams = new URLSearchParams();
        if (guideId !== undefined) queryParams.append("guideId", guideId);
        if (page !== undefined) queryParams.append("page", page);
        if (pageSize !== undefined) queryParams.append("pageSize", pageSize);
        if (orderBy) queryParams.append("orderBy", orderBy);
        if (orderDirection) queryParams.append("orderDirection", orderDirection);
        
        const url = `${this.apiUrl}?${queryParams}`;

        
        return fetch(url)
            .then(response => {
                if (!response.ok) {
                    return response.text().then(errorMessage => {
                        throw {status: response.status, message: errorMessage}
                    })
                }
                return response.json()
            })
            .then((response: Tour[]) => {
                return response;
            })
            .catch(error => {
                console.error('Error:', error.status)
                throw error
            });
    }
}