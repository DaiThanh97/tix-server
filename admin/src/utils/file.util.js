exports.getContentTypeByFile = fileName => {
    var rc = '';
    var fn = fileName.toLowerCase();

    if (fn.indexOf('.png') >= 0) rc = 'image/png';
    else if (fn.indexOf('.jpg') >= 0) rc = 'image/jpg';
    else if (fn.indexOf('.jpeg') >= 0) rc = 'image/jpeg';

    return rc;
}