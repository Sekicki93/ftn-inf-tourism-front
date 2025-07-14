import { Tour } from "../models/tour.model.js";
import { TourService } from "../services/tour.service.js";

const tourService = new TourService()

function renderData(): void {
   
        tourService.getAll()
            .then(tours => {            
                const tours1 = tours.data;
                const table = document.querySelector("tbody");               

                if (!table) {
                    console.error('Table body not found');
                    return;
                }                     

                tours1.forEach((tour) => {
                    const newRow = document.createElement("tr");
                    newRow.onclick = function () {
                        event.preventDefault();
                        window.location.href = `tour.html?id=${tour.id}&name=${tour.name}` ;                        
                        
                    }

                    const cell1 = document.createElement("td");
                    cell1.textContent = tour.name;

                    const cell2 = document.createElement("td");
                    cell2.textContent = tour.description;

                    const cell3 = document.createElement("td");
                    cell3.textContent = tour.maxGuests.toString();

                    const cell4 = document.createElement("td");
                    const dateOfBirth = new Date(tour.dateTime);

                    const year = dateOfBirth.getFullYear();
                    const month = String(dateOfBirth.getMonth() + 1).padStart(2, "0");
                    const day = String(dateOfBirth.getDate()).padStart(2, "0");
                    const formattedDate = `${year}-${month}-${day}`;
                    cell4.textContent = formattedDate;

                    const cell5 = document.createElement("td");
                    cell5.textContent = tour.status;

                    //EDIT
                    const cell6 = document.createElement("td");
                    const editBtn = document.createElement("button");                
                    editBtn.textContent = "Edit";
                    editBtn.addEventListener("click", function () {
                        event.preventDefault();
                        event.stopPropagation();
                        window.location.href = "tour.html?id=" + tour.id;                        
                    });
                    cell6.appendChild(editBtn);

                    //DELETE
                    const cell7 = document.createElement("td");
                    const deleteBtn = document.createElement("button");
                    deleteBtn.textContent = "Delete";                    
                    deleteBtn.onclick = function () {
                        tourService.delete(tour.id.toString())
                            .then(() => {
                                window.location.href = "tour.html";
                            })
                            .catch(error => {
                                console.error(error.status, error.text);
                            });
                    };
                    cell7.appendChild(deleteBtn);

                    // const cell7 = document.createElement("td");
                    // cell7.textContent = korisnik.grupeKorisnika.map(g => g.ime).join(',');

                    newRow.appendChild(cell1);
                    newRow.appendChild(cell2);
                    newRow.appendChild(cell3);
                    newRow.appendChild(cell4);
                    newRow.appendChild(cell5);
                    newRow.appendChild(cell6);
                    newRow.appendChild(cell7);
                    table.appendChild(newRow);            

                });  

                //ADD
                const newRow = document.createElement("tr");
                newRow.id = 'lastRow';
                const cell1 = document.createElement("td");
                const addBtn = document.createElement("button");
                addBtn.textContent = "+ Add";
                cell1.colSpan= 7;
                addBtn.onclick = function () {
                        event.preventDefault();
                        window.location.href = "tour.html?tour=new";                        
                };                

                cell1.appendChild(addBtn);
                newRow.appendChild(cell1);
                table.appendChild(newRow);
            })            
            .catch(error => {
                console.error(error.status, error.message);
            });    
}

function formatDate(isoDateString: string): string {
        const date = new Date(isoDateString)

        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')

        return `${year}-${month}-${day}`
    }

function getDataOnClick(): void {        

    const queryString = window.location.search;
    const urlparams = new URLSearchParams(queryString);
    const id = urlparams.get('id');
    const tour = urlparams.get('tour');
    const tourName = urlparams.get('name');

    if(id && !(tour||tourName)){
    const test = document.querySelector('.form-container') as HTMLElement;
    test.style.display = 'block';

    tourService.getById(id)
        .then(tour => {
            (document.querySelector('#tourId') as HTMLInputElement).value = tour.id.toString();
            (document.querySelector('#tourName') as HTMLInputElement).value = tour.name;
            (document.querySelector('#description') as HTMLInputElement).value = tour.description;
            (document.querySelector('#capacity') as HTMLInputElement).value = tour.maxGuests.toString();
            (document.querySelector('#startDate') as HTMLInputElement).value = formatDate(tour.dateTime.toString());
            (document.querySelector('#status') as HTMLInputElement).value = tour.status;
        })             
        .catch(error => { 
            console.error(error.status, error.text);
        })    
    }
    else if(id && tourName){
        const test = document.querySelector('.form-container') as HTMLElement;
        const buttons = document.querySelector('.form-row-Btn') as HTMLElement;
        const rows = document.querySelector('.form-row') as HTMLElement;
        test.style.display = 'block';
        buttons.style.display = 'none';
   
        const inputs = test.querySelectorAll('input');
        inputs.forEach(el => {
            (el as HTMLInputElement).readOnly = true;
            (el as HTMLInputElement).style.cursor = 'default';
        });    

        tourService.getById(id)
            .then(tour => {
                (document.querySelector('#tourId') as HTMLInputElement).value = tour.id.toString();
                (document.querySelector('#tourName') as HTMLInputElement).value = tour.name;
                (document.querySelector('#description') as HTMLInputElement).value = tour.description;
                (document.querySelector('#capacity') as HTMLInputElement).value = tour.maxGuests.toString();
                (document.querySelector('#startDate') as HTMLInputElement).value = formatDate(tour.dateTime.toString());
                (document.querySelector('#status') as HTMLInputElement).value = tour.status;
            })             
            .catch(error => { 
                console.error(error.status, error.text);
            })  
    }
    else if (tour){
        const test = document.querySelector('.form-container') as HTMLElement;
        test.style.display = 'block';     
    }          
}      

function submit(): void {
    event.preventDefault(); 
    const id = (document.querySelector('#tourId') as HTMLInputElement).value;
    const tourName = (document.querySelector('#tourName') as HTMLInputElement).value;
    const description = (document.querySelector('#description') as HTMLInputElement).value;
    const capacity = (document.querySelector('#capacity') as HTMLInputElement).value;
    const startDate = (document.querySelector('#startDate') as HTMLInputElement).value;
    const status = (document.querySelector('#status') as HTMLInputElement).value;

    if (!tourName || !description || !capacity || !startDate || !startDate) {
        alert("All fields are required!");
        return;
    }

    const editData: Tour = {
    id: Number(id),
    name: tourName,
    description: description,
    maxGuests: Number(capacity),
    dateTime: new Date(startDate),
    status: status
    };

    const addData: Tour = {
    id: Number(id),
    name: tourName,
    description: description,
    maxGuests: Number(capacity),
    dateTime: new Date(startDate),
    status: status,
    guideId: 11
    };         

    if (id) {
        tourService.update(id, editData)
            .then(() => {
                window.location.href = 'tour.html'
            }).catch(error => {
                console.error(error.status, error.text);
            })    
            .catch(error => {
                console.error(error.status, error.message);
                console.log(`Greška ${error.status}: ${error.message}`);
            });
    }
    else{
        tourService.addNew(addData)
        .then(() => {
            window.location.href = 'tour.html';
        })
        .catch(error => {
            console.error(error.status, error.message);
            console.log(`Greška ${error.status}: ${error.message}`);
        });        
    }
}

document.addEventListener('DOMContentLoaded', ()=>{    
    const button = document.querySelector("#form-submit-Btn");
    if (button) {
        button.addEventListener("click", submit)
    }    
    getDataOnClick();
})

renderData()