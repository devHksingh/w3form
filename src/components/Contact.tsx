// import { ChevronDownIcon, UserCircleIcon } from "lucide-react";
// 
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useMutation } from "@tanstack/react-query";
import { postForm } from "../http/api";
import { ToastContainer, toast } from 'react-toastify'
import type { AxiosError } from "axios";

export interface FormsProps {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}
interface ErrorResponse{
  message:string
}

const schema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "last name is required"),
  email: z.string().email(),
  message: z.string().min(1, "message name is required"),
});
const Contact = () => {
  const mutation = useMutation({
    mutationFn:postForm,
    onSuccess:(data)=>{
      console.log(data);
      
      console.log("message send!");
      toast.success("message send✅")
      reset()
    },
    onError:(err:AxiosError<ErrorResponse>)=>{
      console.log("error while sending msg",err)
      toast.error("Server error⚠️.msg not send.try it again!")
    }
  })
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });
  const onSubmit = (data: FormsProps) => {
    console.log(data);
    const formData = {...data,"access_key":import.meta.env.VITE_PUBLIC_ACCESS_KEY}
    
    
    mutation.mutate(formData)
  };
  return (
    <div className=" p-2 rounded-2xl max-w-4xl mx-auto pt-4">
      <h1 className="  text-center capitalize">contact</h1>

      <form
        className="mt-4 border p-2 px-4 rounded-2xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base/7 font-semibold text-gray-900">
              Personal Information
            </h2>
            <p className="mt-1 text-sm/6 text-gray-600">
              This is a dummy form for testing .
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  First name
                </label>
                <div className="mt-2">
                  <input
                    id="first-name"
                    type="text"
                    autoComplete="given-name"
                    {...register("firstName")}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                  <span className="text-sm text-rose-500">{errors.firstName?.message}</span>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="last-name"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Last name
                </label>
                <div className="mt-2">
                  <input
                    id="last-name"
                    type="text"
                    autoComplete="family-name"
                    {...register("lastName")}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                  <span className="text-sm text-rose-500">{errors.lastName?.message}</span>
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="email"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2 col-span-full ">
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    {...register("email")}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 "
                  />
                  <span className="text-sm text-rose-500">{errors.email?.message}</span>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="about"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Meassage
                </label>
                <div className="mt-2">
                  <textarea
                    id="about"
                    rows={3}
                    {...register("message")}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    defaultValue={"This is dummy text for testing"}
                  />
                  <span className="text-sm text-rose-500">{errors.message?.message}</span>
                </div>
                <p className="mt-3 text-sm/6 text-gray-600">
                  Write a few sentences about yourself.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-x-6">
          {/* <button type="button" className="text-sm/6 font-semibold text-gray-900">
          Cancel
        </button> */}
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-full hover:cursor-pointer"
          >
            Submit
          </button>
        </div>
      </form>
      <ToastContainer/>
    </div>
  );
};

export default Contact;
