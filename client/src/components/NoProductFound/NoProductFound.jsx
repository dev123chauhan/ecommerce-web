import noproductfound from "../../../public/assets/Not-found.gif";
export default function NoProductFound() {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-20">
      <img src={noproductfound} alt="No products found" className="w-full max-w-md" />
    </div>
  );
}
