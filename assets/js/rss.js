document.addEventListener('DOMContentLoaded', function () {
    const apiUrl = 'https://rss.wangyunzi.com/p/api/greader.php/reader/api/0/stream/contents/reading-list?&n=1000';
    const outputElement = document.getElementById('rss-articles');

    fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer 你的_api_token'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.items) {
            let html = '<ul>';
            data.items.forEach(article => {
                html += `
                    <li>
                        <a href="${article.alternate[0].href}" target="_blank">
                            <h2>${article.title}</h2>
                            <p>${article.summary.content}</p>
                            <p><small>Published: ${new Date(article.published * 1000).toLocaleString()}</small></p>
                        </a>
                    </li>
                `;
            });
            html += '</ul>';
            outputElement.innerHTML = html;
        } else {
            outputElement.innerHTML = 'No articles found.';
        }
    })
    .catch(error => {
        console.error('Error fetching articles:', error);
        outputElement.innerHTML = 'Error fetching articles.';
    });
});
