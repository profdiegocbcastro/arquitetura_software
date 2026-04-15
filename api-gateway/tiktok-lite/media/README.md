# Pasta de mídia

Este projeto considera um único vídeo de exemplo com 3 variantes.

```text
media
`-- videos
    `-- video-1
        |-- low.mp4
        |-- medium.mp4
        |-- high.mp4
        `-- poster.jpg
```

As URLs públicas serão expostas pelo gateway em:

```text
http://localhost:4000/media/videos/video-1/low.mp4
http://localhost:4000/media/videos/video-1/medium.mp4
http://localhost:4000/media/videos/video-1/high.mp4
```

O serviço de playback usa essas variantes para escolher a melhor entrega de acordo com a rede.
