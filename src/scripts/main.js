function BlogPost(postData) {
    return `<div class="event">
                <div>
                    <strong> venue </strong>
                    <span>${postData.venue}</span>
                </div>
                <div>
                    <strong> title </strong>
                    <span>${postData.title}</span>
                </div>
                <div>
                    <strong> date </strong>
                    <span>${postData.date}</span>
                </div>
                <div>
                    <strong> time </strong>
                    <span>${postData.time}</span>
                </div>
                <div>
                    <strong> description </strong>
                    <span>${postData.description}</span>
                </div>
                <div>
                    <strong> url </strong>
                    <span>${postData.url}</span>
                </div>
                <div>
                    <strong> venueUrl </strong>
                    <span>${postData.venueUrl}</span>
                </div>
            </div>`;
}

function blogPostList(posts) {
    return `<div class="event-list">
                ${posts.map(BlogPost).join('')}
            </div>`;
}

function getJson() {
    let url = 'https://crossorigin.me/https://bostbuilt.com/files/currentEvents.json';
    $.ajax({
        url: url,
        success: function(data) {
            document.querySelector('body').innerHTML = blogPostList(data);
        }
    });
}

getJson();
