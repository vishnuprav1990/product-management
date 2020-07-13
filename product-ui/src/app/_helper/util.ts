export function sortArray(array: any, sortevent: any): any {

    return array.sort((x, y) => {
        if (sortevent.sortColumn.search('.') > -1) {
            const keys = sortevent.sortColumn.split('.');
            keys.forEach(element => {
                x = x[element];
                y = y[element];
            });
        } else {
            x = x[sortevent.sortColumn];
            y = y[sortevent.sortColumn];
        }
        if (sortevent.sortDirection === 'desc') {
            return ((x > y) ? -1 : ((x < y) ? 1 : 0));
        } else {
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        }
    });
}
