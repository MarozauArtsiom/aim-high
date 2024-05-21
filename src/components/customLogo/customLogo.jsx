import { useCreateObjectUrl } from "../../hooks/image";
import BrandLogoMock from "../../assets/brand_logo_mock.svg";

export default function CustomLogo({
  className,

  file,
  setFile,

  setImageCroperProps,

  onImageRectChange,
  imageRect,
}) {
  const logo = useCreateObjectUrl(file, BrandLogoMock);

  return (
    <button
      className={`${className || ""} button-reset`}
      disabled={!file}
      onClick={() =>
        setImageCroperProps({
          isOpen: true,
          file: file,
          onChange: setFile,
          crop: file,
          imageRect: imageRect,
          onImageRectChange: (val) => {
            setImageCroperProps((crop) => ({ ...crop, imageRect: val }));
            onImageRectChange(val);
          },
        })
      }
    >
      <img
        src={logo}
        width={imageRect.width}
        height={imageRect.height}
        style={{
          transform: `translate(${imageRect.x}px, ${0 - imageRect.y}px)`,
        }}
      />
    </button>
  );
}
