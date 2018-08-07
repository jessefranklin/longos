import moment from 'moment';

export const orderDate = (d2) => {
    const d1 = moment().format('YYYY-MM-DD');
    const tmrw = moment(d1).add(1,'days');

    if(moment(d2).isBefore(d1)){
        return {
            title: 'Past Due',
            class: 'past-due'
        }
    }

    if(moment(d2).isSame(d1)){
        return {
            title: 'Pick up today',
            class: 'pick-up-today'
        }
    }

    if(moment(d2).isSame(trmw)){
        return {
            title: 'Pick up soon',
            class: 'pick-up-tmrw'
        }
    }
}