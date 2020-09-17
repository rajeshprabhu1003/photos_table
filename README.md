Steps used for displaying data - 
1. Get all data from the api. (i.e. 0 to 5000 which is max)
2. First Time, the data is stored in sessionStorage to store the copy in case user refreshes, the data is still present.
3. Whenver user clicks delete, the data is removed from sessionStorage itself and the updated data is shown.
4. Paginator is also used in this project.

Addons used - 
1. Table - MatTable
2. Paginator - MatPaginator
3. Delete Icon: MatIcon