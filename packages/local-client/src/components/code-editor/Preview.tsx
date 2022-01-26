import { useEffect, useRef } from "react";

import "./preview.css";

interface PreviewProps {
  code: string;
  err: string;
}

const Preview: React.FC<PreviewProps> = ({ code, err }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const html = `
    <html>
      <head></head>
      <body>
        <div id="root"> </div>
        <script>
          const handleError = (e) => {
            const root = document.querySelector("#root");
            root.innerHTML =
              "<div style = 'color:red;'> <h4>Runtime Error: </h4>" + e + "</div>";
            console.error(e);
          };

          window.addEventListener("error", (e) => {
            e.preventDefault();
            handleError(e.error)
          });

          window.addEventListener("message", (event) => {
            try {
                eval(event.data);
              } catch (error) {
                handleError(error)
                }
          })
        </script>
      </body>
    </html>
  `;

  useEffect(() => {
    iframeRef!.current!.srcdoc = html;

    setTimeout(() => {
      iframeRef.current?.contentWindow?.postMessage(code, "*");
    }, 50);
  }, [code]);

  return (
    <div className="preview-wrapper">
      <iframe
        title="editor"
        ref={iframeRef}
        sandbox="allow-scripts"
        srcDoc={html}
      />
      {err && <div className="preview-error">{err}</div>}
    </div>
  );
};

export default Preview;
