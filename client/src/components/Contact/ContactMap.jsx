export default function ContactMap() {
  return (
    <div className="mt-12 w-full">
      <div className="aspect-w-16 aspect-h-9 w-full">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.9034454762266!2d72.5544441!3d23.0276297!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e84e8f8295a89%3A0x7a876d7a23fa4493!2sShopVibe!5e0!3m2!1sen!2sin!4v1638440341932!5m2!1sen!2sin"
          className="w-full h-[450px] rounded-lg"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="ShopVibe Location Map"
        ></iframe>
      </div>
    </div>
  );
}