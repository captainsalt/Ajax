$(document).ready(() => {
    populateImageArea("tiger"); //test code

    async function populateImageArea(searchQuery) {
        var imageDiv = $("#imageContainer");
        var response = await request(searchQuery);

        //clear image div
        $("#imageContainer").empty();

        for (var i = 0; i < response.data.length; i++) {
            var gif = $(`<img>`)
                .addClass("image")
                .data("data-is_active", "")
                .data("data-inactive", response.data[i].images.fixed_width_small_still.url)
                .data("data-active", response.data[i].images.fixed_width_small.url)
                .attr("src", response.data[i].images.fixed_width_small_still.url);

            imageDiv.append(gif);
        }

        hookIntoImageEvents();

        //helper functions
        function request(searchQuery, limit = 24) {
            var key = "0964cff7104b440d886afa3fe6ec8dcd";
            var baseUri = "https://api.giphy.com";
            var resource = `/v1/gifs/search?api_key=${key}&q=${searchQuery}&limit=${limit}`;

            var response = $.get(`${baseUri}${resource}`);
            return response;
        }

        function hookIntoImageEvents() {
            $(".image").click(e => {
                var image = $(e.currentTarget);

                if (image.data("data-is_active")) {
                    image.attr("src", image.data("data-inactive"))
                        .data("data-is_active", false);
                } else {
                    image.attr("src", image.data("data-active"))
                        .data("data-is_active", true);
                }
            });
        }
    }
});