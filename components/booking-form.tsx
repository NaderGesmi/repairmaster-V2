"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useLanguage } from "@/components/language-provider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

interface FormData {
  name: string;
  phone: string;
  service: string;
  address: string;
  datetime: Date | undefined;
  notes?: string;
  addressType: "auto" | "manual";
}

export default function BookingForm() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    service: "",
    address: "",
    datetime: undefined,
    notes: "",
    addressType: "manual", // Default to manual
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string>("");

  const services = [
    { value: "tv-repairs", label: t("services.tv.title") || "TV Repairs" },
    { value: "ac-cleaning", label: t("services.acCleaning.title") || "AC Cleaning" },
    { value: "ac-installation", label: t("services.acInstallation.title") || "AC Installation" },
    { value: "freon-check", label: t("services.freon.title") || "Freon Check" },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setError(null); // Clear error on input change
    setSuccess(false); // Clear success on input change
  };

  const handleServiceChange = (value: string) => {
    setFormData((prev) => ({ ...prev, service: value }));
    setError(null);
    setSuccess(false);
  };

  const handleAddressTypeChange = (value: "auto" | "manual") => {
    setFormData((prev) => ({ ...prev, addressType: value }));
    setError(null);
    setSuccess(false);
    if (value === "auto") {
      getAddress();
    } else {
      setFormData((prev) => ({ ...prev, address: "" })); // Clear address if switching to manual
    }
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    // Don't update formData.datetime here directly, wait for time selection or submission
    setError(null);
    setSuccess(false);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value);
    // Don't update formData.datetime here directly, wait for date selection or submission
    setError(null);
    setSuccess(false);
  };

  const getAddress = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await response.json();
            if (data.display_name) {
              setFormData((prev) => ({ ...prev, address: data.display_name }));
            } else {
              setError(t("booking.locationError") || "Could not get your location. Please enter address manually.");
              setFormData((prev) => ({ ...prev, addressType: "manual" }));
            }
          } catch (error) {
            console.error("Error fetching address:", error);
            setError(t("booking.locationError") || "Could not get your location. Please enter address manually.");
            setFormData((prev) => ({ ...prev, addressType: "manual" }));
          }
          setLoading(false);
        },
        (error) => {
          console.error("Geolocation error:", error);
          setError(t("booking.locationError") || "Could not get your location. Please enter address manually.");
          setFormData((prev) => ({ ...prev, addressType: "manual" }));
          setLoading(false);
        }
      );
    } else {
      setError(t("booking.locationError") || "Geolocation is not supported by your browser. Please enter address manually.");
      setFormData((prev) => ({ ...prev, addressType: "manual" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    // Combine date and time only during submission
    let combinedDatetime: Date | undefined = undefined;
    if (date && time) {
      const [hours, minutes] = time.split(":").map(Number);
      combinedDatetime = new Date(date);
      combinedDatetime.setHours(hours, minutes, 0, 0);

      // Client-side check if the combined date and time is in the past
      if (combinedDatetime < new Date()) {
        setError(t("booking.submitError") || "Booking date and time cannot be in the past.");
        setLoading(false);
        return;
      }
    } else if (date) {
       // If only date is selected, set time to start of day. Backend should validate if time is required.
       combinedDatetime = new Date(date);
       combinedDatetime.setHours(0, 0, 0, 0);
    } else if (time) {
        // If only time is selected, assume today's date. Backend should validate if date is required.
        combinedDatetime = new Date();
        const [hours, minutes] = time.split(":").map(Number);
        combinedDatetime.setHours(hours, minutes, 0, 0);
         // Client-side check if the combined date and time is in the past
        if (combinedDatetime < new Date()) {
            setError(t("booking.submitError") || "Booking time cannot be in the past.");
            setLoading(false);
            return;
        }
    }

    const dataToSend = {
      ...formData,
      datetime: combinedDatetime ? combinedDatetime.toISOString() : undefined, // Send as ISO string or undefined
    };

    // Client-side validation for required fields including the combined datetime
    if (!dataToSend.name || !dataToSend.phone || !dataToSend.service || !dataToSend.address || !dataToSend.datetime) {
        setError(t("booking.submitError") || "Please fill in all required fields (Name, Phone, Service, Address, Date & Time).");
        setLoading(false);
        return;
    }

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess(true);
        // Reset form
        setFormData({
            name: "",
            phone: "",
            service: "",
            address: "",
            datetime: undefined,
            notes: "",
            addressType: "manual",
          });
        setDate(undefined); // Reset date picker state
        setTime(""); // Reset time input state
      } else {
        // Display the specific error message from the API if available
        setError(result.error || t("booking.submitError") || "Failed to submit booking. Please try again.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      setError(t("booking.submitError") || "Failed to submit booking. Please try again.");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">{t("booking.name") || "Full Name"}</Label>
        <Input
          id="name"
          placeholder={t("booking.namePlaceholder") || "Enter your full name"}
          value={formData.name}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">{t("booking.phone") || "Phone Number"}</Label>
        <Input
          id="phone"
          placeholder={t("booking.phonePlaceholder") || "Enter your phone number"}
          value={formData.phone}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="service">{t("booking.service") || "Select a Service"}</Label>
        <Select onValueChange={handleServiceChange} value={formData.service} required>
          <SelectTrigger id="service">
            <SelectValue placeholder={t("booking.selectService") || "Select a Service"} />
          </SelectTrigger>
          <SelectContent>
            {services.map((service) => (
              <SelectItem key={service.value} value={service.value}>
                {service.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>{t("booking.addressType") || "Address Input Method"}</Label>
        <RadioGroup
          value={formData.addressType}
          onValueChange={handleAddressTypeChange}
          className="flex items-center space-x-4 rtl:space-x-reverse"
        >
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <RadioGroupItem value="auto" id="auto-location" />
            <Label htmlFor="auto-location">{t("booking.autoLocation") || "Use My Location"}</Label>
          </div>
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <RadioGroupItem value="manual" id="manual-location" />
            <Label htmlFor="manual-location">{t("booking.manualLocation") || "Enter Manually"}</Label>
          </div>
        </RadioGroup>
      </div>

      {formData.addressType === "manual" && (
        <div className="space-y-2">
          <Label htmlFor="address">{t("booking.address") || "Address"}</Label>
          <Input
            id="address"
            placeholder={t("booking.addressPlaceholder") || "Enter your address"}
            value={formData.address}
            onChange={handleInputChange}
            required
          />
        </div>
      )}

       {formData.addressType === "auto" && loading && (
         <div className="space-y-2">
            <Label htmlFor="address">{t("booking.address") || "Address"}</Label>
             <Input
              id="address"
              placeholder={t("booking.addressPlaceholder") || "Fetching location..."}
              value={formData.address}
              onChange={handleInputChange}
              disabled
              required
            />
         </div>
       )}

       {formData.addressType === "auto" && !loading && formData.address && (
         <div className="space-y-2">
             <Label htmlFor="address">{t("booking.address") || "Address"}</Label>
              <Input
               id="address"
               placeholder={t("booking.addressPlaceholder") || "Enter your address"}
               value={formData.address}
               onChange={handleInputChange}
               required
             />
          </div>
       )}

      <div className="space-y-2">
        <Label htmlFor="datetime">{t("booking.datetime") || "Preferred Date & Time"}</Label>
        <div className="flex gap-4">
           <Popover>
             <PopoverTrigger asChild>
               <Button
                 variant={"outline"}
                 className={
                   `w-full justify-start text-left font-normal ${!date && "text-muted-foreground"}`
                 }
               >
                 <CalendarIcon className="mr-2 h-4 w-4" />
                 {date ? format(date, "PPP") : <span className="rtl:text-right">{t("contact.selectDate") || "Pick a date"}</span>}
               </Button>
             </PopoverTrigger>
             <PopoverContent className="w-auto p-0">
               <Calendar
                 mode="single"
                 selected={date}
                 onSelect={handleDateSelect}
                 initialFocus
               />
             </PopoverContent>
           </Popover>
           <Input
             type="time"
             id="time"
             value={time}
             onChange={handleTimeChange}
             required
             className="w-1/2"
           />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">{t("booking.notes") || "Notes (Optional)"}</Label>
        <Textarea
          id="notes"
          placeholder={t("booking.notesPlaceholder") || "Any additional information or special requests"}
          value={formData.notes}
          onChange={handleInputChange}
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && <p className="text-green-500 text-sm">{t("booking.success") || "✅ Booking sent! We'll contact you soon."}</p>}

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? (t("booking.submitting") || "Submitting...") : (t("booking.submit") || "Submit Booking")}
      </Button>
    </form>
  );
} 