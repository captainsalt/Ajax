$(document).ready(() => {
    var buttonArray = ["Cat", "Dog", "Kevin Durant", "Computer", "Lightbulb"];
    updateButtons();

    function updateButtons() {
        $("#buttons").empty();

        for (var i = 0; i < buttonArray.length; i++) {
            var buttonArrayItem = buttonArray[i];

            // move to add logic
            if (!buttonArrayItem) //If the string is null or empty continue 
                continue;

            var button = $("<button>")
                .html(buttonArrayItem)
                .addClass("queryButton");

            $("#buttons").append(button);
        }

        hookIntoButtonEvents();

        //Helper function
        function hookIntoButtonEvents() {
            $(".queryButton").click(e => {
                populateImageArea($(e.currentTarget).html());
            });
        }
    }

    async function populateImageArea(searchQuery) {
        var imageDiv = $("#imageContainer");
        var response = await request(searchQuery);
        var maxImages = 20;
        var images = 0;

        //clear image div
        $("#imageContainer").empty();

        for (var i = 0;; i++) {
            var gifHeight = response.data[i].images.fixed_width_small.height;

            if (gifHeight > 120) //if gif height is greater than 120 skip it
                continue

            var gif = $(`<img>`)
                .addClass("image")
                .data("data-is_active", "")
                .data("data-inactive", response.data[i].images.fixed_width_small_still.url)
                .data("data-active", response.data[i].images.fixed_width_small.url)
                .attr("src", response.data[i].images.fixed_width_small_still.url);

            imageDiv.append(gif);
            images++;

            if (images >= maxImages)
                break;
        }

        hookIntoImageEvents();

        //helper functions
        function request(searchQuery) {
            var key = "0964cff7104b440d886afa3fe6ec8dcd";
            var baseUri = "https://api.giphy.com";
            var resource = `/v1/gifs/search?api_key=${key}&q=${searchQuery}&limit=50`;

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

    $("#confirmAdd").click(e => {
        var text = $("#inputText:text").val().trim();
        var existingButtons = $(".queryButton").get();

        for (var i = 0; i < existingButtons.length; i++) {
            var buttonText = existingButtons[i].innerHTML;

            //prevent duplicates
            if (buttonText.toLowerCase() === text.toLowerCase())
                return;
        }

        buttonArray.push(text);
        updateButtons();
    });
});