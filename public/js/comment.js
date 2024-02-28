document.querySelectorAll('.comment-form').forEach((form) => {
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const postId = form.querySelector('.comment-button').getAttribute('data-postid');
        const content = form.querySelector('.comment-textarea').value.trim();

        if (content) {
            console.log(content);
            try {
                const response = await fetch(`/api/comments/${postId}/comments`, {
                    method: 'POST',
                    body: JSON.stringify({ text: content }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    document.location.reload();  // Reload the page after successful comment creation
                } else {
                    alert('Failed to create comment');
                }
            } catch (err) {
                console.error('Fetch error:', err);
                if (err.response) {
                    console.error('Response data:', err.response.data);
                    console.error('Response status:', err.response.status);
                    console.error('Response headers:', err.response.headers);
                }
                alert('Failed to create comment. Check console for more details.');
            }
        }
    });
});