import signupimage from "../../assets/loginimage.png";

export default function AuthImage() {
  return (
    <div className="hidden md:flex md:w-1/2 items-center justify-center p-8">
    <img
      src={signupimage}
      alt="Shopping concept"
      className="max-w-full h-auto"
    />
  </div>
  )
}
