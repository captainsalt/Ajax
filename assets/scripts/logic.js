$(document).ready(() => {

    $(document).click(() => {
        console.log(request("Elephant"));
    });

    function request(search) {
        var key = "0964cff7104b440d886afa3fe6ec8dcd";
        var baseUri = "https://api.giphy.com";
        var resource = `/v1/gifs/search?api_key=${key}&q=${search}`;

        var response = $.get(`${baseUri}${resource}`);
        return response;
    }
});