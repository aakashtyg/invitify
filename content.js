// Add listener to listen to incoming messages from background
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {

        // Execute the script if the status from background is "ecexute"
        if (request.status == "execute") {
            console.log('Executing script');

            // Gathers all the invite links/buttons in an array and click them one by one
            function inviteAll() {
                var invitesContainer = document.getElementsByClassName("fbProfileBrowserResult")[0];

                // Go to top of the container containing all the friends
                invitesContainer.scrollTop = 0;

                // Get all the invite links. This will get all the invite links/buttons in an array
                var inviteLinksArr = document.getElementsByClassName("uiButton _1sm");

                // Click all the invite links/buttons in the array, one by one to invite all friends
                for(var i = 0; i < inviteLinksArr.length; i++) {
                    inviteLinksArr[i].click();

                    /* TEST CASE: to check we have all the buttons
                     * Comment out the inviteLinksArr[i].click() call and test that we are getting
                     * each button. This test case will change the background color of each link/button
                     * in the array to green.
                     * inviteLinksArr[i].style.backgroundColor = "green";
                     */

                }
                // Success message to show up after all the friends in the list are invited
                alert("All friends invited!");
            }

            /* Scroll the div containing all the invite links/buttons all the way to the bottom.
             * The div contains only some of the friends at first, and the div is populated with
             * rest of the friends by using AJAX as we scroll down. We need to scroll the div till
             * we reach the bottom to get all the friends (and the invite link/button corresponding to them).
             */
            function goDown() {
                var invitesContainer = document.getElementsByClassName("fbProfileBrowserResult")[0];
                var temp = invitesContainer.scrollTop;

                // Scroll the div
                invitesContainer.scrollTop = invitesContainer.scrollHeight;

                /* Clear the interval if the scrollTop property of the container containing all the
                 * invite links/buttons is same as the variable 'temp', which means we have reached the
                 * bottom of the div and can't scroll further.
                 */
                if(temp === invitesContainer.scrollTop) {
                    // Clear interval
                    clearInterval(intervalId);

                    // Once at the end of the div, call invite function
                    inviteAll();
                }
            }

            /* Call function goDown after every 500 milliseconds. Read goDown functions comment to know
             * why we need to call the goDown function again and again.
             */
            var intervalId = setInterval(goDown, 500);

            // Send respons status as success to the background
            sendResponse({ status: "success" });
        }
    });
