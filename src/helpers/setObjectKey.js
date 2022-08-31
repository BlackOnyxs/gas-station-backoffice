
export const setObjectKey = (obj = {}) => {
    if ( obj._id ) {
        obj.key = obj._id;
    }else {
        obj.key = obj.uid;
    }
    
    return obj;
}