import $ from 'jquery';

$.iPost = (url, data) => {
    return $.ajax({
        url: url,
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(data)
    });
}
