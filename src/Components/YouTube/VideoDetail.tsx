export default function VideoDetail({video}) {
    const {title,} = video.snippet
    return (
        <section>
            <article>
                <iframe
                    id="player"
                    type="text/html"
                    width="100%" height="640"
                    src={`https://www.youtube.com/embed/${video.id}`}
                    frameBorder="0"
                    title={title}
                />
            </article>
        </section>
    )
}

