import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigation } from "react-router";

const regions = [
  "Dhaka",
  "Chattogram",
  "Rajshahi",
  "Khulna",
  "Barishal",
  "Sylhet",
  "Rangpur",
  "Mymensingh",
];

const districts = [
  "Dhaka",
  "Gazipur",
  "Narayanganj",
  "Chattogram",
  "Cumilla",
  "Rajshahi",
  "Khulna",
  "Sylhet",
];

function RiderRegister() {
  const {registerUser} = useAuth()
  console.log(registerUser);
  const location = useLocation();
  const navigation = useNavigation();
  console.log(navigation);
  console.log('in register', location);
  const [formData, setFormData] = useState({
    name: "",
    drivingLicenseNumber: "",
    email: "",
    region: "",
    district: "",
    nid: "",
    phone: "",
    bikeBrandModelYear: "",
    bikeRegistrationNumber: "",
    about: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("rider form data:", formData);
  };

  return (
    <main className="min-h-screen bg-white px-6 py-10 text-[#03373d] sm:px-10 lg:px-12">
      <section className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-black tracking-normal sm:text-5xl">
            Be a Rider
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-6 text-muted-foreground">
            Enjoy fast, reliable parcel delivery with real-time tracking and
            zero hassle. From personal packages to business shipments — we
            deliver on time, every time.
          </p>
        </div>

        <Separator className="my-10" />

        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,580px)_1fr] lg:gap-16">
          <section>
            <h2 className="mb-5 text-2xl font-extrabold tracking-normal">
              Tell us about yourself
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-1.5">
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  autoComplete="name"
                  required
                  className="h-10 border-slate-300 focus-visible:border-lime-400 focus-visible:ring-lime-200/70"
                />
              </div>

              <div className="grid gap-1.5">
                <Label htmlFor="drivingLicenseNumber">
                  Driving License Number
                </Label>
                <Input
                  id="drivingLicenseNumber"
                  name="drivingLicenseNumber"
                  value={formData.drivingLicenseNumber}
                  onChange={handleChange}
                  placeholder="Driving License Number"
                  required
                  className="h-10 border-slate-300 focus-visible:border-lime-400 focus-visible:ring-lime-200/70"
                />
              </div>

              <div className="grid gap-1.5">
                <Label htmlFor="email">Your Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  autoComplete="email"
                  required
                  className="h-10 border-slate-300 focus-visible:border-lime-400 focus-visible:ring-lime-200/70"
                />
              </div>

              <div className="grid gap-1.5">
                <Label>Your Region</Label>
                <Select
                  value={formData.region}
                  onValueChange={(value) => handleSelectChange("region", value)}
                >
                  <SelectTrigger className="h-10 border-slate-300 focus:border-lime-400 focus:ring-lime-200/70">
                    <SelectValue placeholder="Select your Region" />
                  </SelectTrigger>
                  <SelectContent>
                    {regions.map((region) => (
                      <SelectItem key={region} value={region}>
                        {region}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-1.5">
                <Label>Your District</Label>
                <Select
                  value={formData.district}
                  onValueChange={(value) =>
                    handleSelectChange("district", value)
                  }
                >
                  <SelectTrigger className="h-10 border-slate-300 focus:border-lime-400 focus:ring-lime-200/70">
                    <SelectValue placeholder="Select your District" />
                  </SelectTrigger>
                  <SelectContent>
                    {districts.map((district) => (
                      <SelectItem key={district} value={district}>
                        {district}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-1.5">
                <Label htmlFor="nid">NID No</Label>
                <Input
                  id="nid"
                  name="nid"
                  value={formData.nid}
                  onChange={handleChange}
                  placeholder="NID"
                  required
                  className="h-10 border-slate-300 focus-visible:border-lime-400 focus-visible:ring-lime-200/70"
                />
              </div>

              <div className="grid gap-1.5">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  autoComplete="tel"
                  required
                  className="h-10 border-slate-300 focus-visible:border-lime-400 focus-visible:ring-lime-200/70"
                />
              </div>

              <div className="grid gap-1.5">
                <Label htmlFor="bikeBrandModelYear">
                  Bike Brand Model and Year
                </Label>
                <Input
                  id="bikeBrandModelYear"
                  name="bikeBrandModelYear"
                  value={formData.bikeBrandModelYear}
                  onChange={handleChange}
                  placeholder="Bike Brand Model and Year"
                  required
                  className="h-10 border-slate-300 focus-visible:border-lime-400 focus-visible:ring-lime-200/70"
                />
              </div>

              <div className="grid gap-1.5">
                <Label htmlFor="bikeRegistrationNumber">
                  Bike Registration Number
                </Label>
                <Input
                  id="bikeRegistrationNumber"
                  name="bikeRegistrationNumber"
                  value={formData.bikeRegistrationNumber}
                  onChange={handleChange}
                  placeholder="Bike Registration Number"
                  required
                  className="h-10 border-slate-300 focus-visible:border-lime-400 focus-visible:ring-lime-200/70"
                />
              </div>

              <div className="grid gap-1.5">
                <Label htmlFor="about">Tell Us About Yourself</Label>
                <Input
                  id="about"
                  name="about"
                  value={formData.about}
                  onChange={handleChange}
                  placeholder="Tell Us About Yourself"
                  className="h-10 border-slate-300 focus-visible:border-lime-400 focus-visible:ring-lime-200/70"
                />
              </div>

              <Button
                type="submit"
                className="h-10 w-full bg-lime-300 font-semibold text-slate-950 hover:bg-lime-400"
              >
                Submit
              </Button>
            </form>
          </section>

          <section className="hidden min-h-[480px] items-center justify-center lg:flex">
            <img
              src="/assets/rider.png"
              alt="Rider delivering a parcel"
              className="w-full max-w-[480px] object-contain"
            />
          </section>
        </div>
      </section>
    </main>
  );
}

export default RiderRegister;
