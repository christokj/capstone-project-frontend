import React, { useContext } from 'react';
import * as formik from 'formik';
import * as yup from 'yup';
import { MyContext } from '../Context/Context';
function ContactForm() {

    const { value, setValue } = useContext(MyContext);

    const { Formik } = formik;
    const schema = yup.object().shape({
        fullName: yup.string().required("Please enter Fullname").min(3, "Fullname should have minimum 3 characters!!"),
        place: yup.string().required("Please enter Place").min(3, "Place should have minimum 3 characters!!"),
        email: yup.string().required().matches(/\S+@\S+\.\S+/, "Please enter valid email"),
        phone: yup.number().required("Please enter phone number").positive().test('leng', "Phone number should be 10 digits", (value) => {
            if (String(value).length === 10) {
                return true;
            } else {
                return false;
            }
        }),
        messages: yup.string().required("Please enter any messages").min(2, "Messages should have minimum 2 characters!!")

    });

    const handleSignupSubmit = (values) => {
        console.log(values);
    }

    return (
        <>
            <>
                <Formik
                    validationSchema={schema}
                    onSubmit={handleSignupSubmit}
                    initialValues={{
                        fullName: '',
                        email: '',
                        phone: '',
                        place: '',
                        messages: '',
                    }}
                >
                    {({ handleSubmit, handleChange, values, touched, errors }) => (
                        <formik.Form
                            className='pt-5 mx-8'
                            noValidate
                            onSubmit={handleSubmit}
                        >
                            <h1 className='text-center text-2xl font-semibold mb-4'>Contact me</h1>
                            <div className="mb-4 flex flex-wrap -mx-2">
                                <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0 ">
                                    <label className='block text-sm font-medium mb-1' >Fullname</label>
                                    <input
                                        type="text"
                                        id="formGridFullname"
                                        placeholder="Enter Fullname"
                                        name="fullName"
                                        value={values.fullName}
                                        onChange={handleChange}
                                        className={`w-full ${value && 'bg-gray-800'} p-2 border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} rounded`}
                                    />
                                    {errors.fullName && <p className='text-red-500 text-xs italic mt-1'>{errors.fullName}</p>}
                                </div>
                                <div className="w-full md:w-1/2 px-2">
                                    <label className='block text-sm font-medium mb-1' >Place</label>
                                    <input
                                        type="text"
                                        id="formGridPlace"
                                        placeholder="Place"
                                        name="place"
                                        value={values.place}
                                        onChange={handleChange}
                                        className={`w-full p-2  ${value && 'bg-gray-800'} border ${errors.place ? 'border-red-500' : 'border-gray-300'} rounded`}
                                    />
                                    {errors.place && <p className='text-red-500 text-xs italic mt-1'>{errors.place}</p>}
                                </div>
                            </div>
                            <div className="mb-4 flex flex-wrap -mx-2">
                                <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
                                    <label className='block text-sm font-medium mb-1' >Email</label>
                                    <input
                                        type="text"
                                        id="formGridEmail"
                                        placeholder="Enter email"
                                        name="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        className={`w-full p-2  ${value && 'bg-gray-800'} border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded`}
                                    />
                                    {errors.email && <p className='text-red-500 text-xs italic mt-1'>{errors.email}</p>}
                                </div>
                                <div className="w-full md:w-1/2 px-2">
                                    <label className='block text-sm font-medium mb-1' >Phone</label>
                                    <input
                                        type="text"
                                        id="formGridMobile"
                                        placeholder="Phone"
                                        name="phone"
                                        value={values.phone}
                                        onChange={handleChange}
                                        className={`w-full p-2  ${value && 'bg-gray-800'} border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded`}
                                    />
                                    {errors.phone && <p className='text-red-500 text-xs italic mt-1'>{errors.phone}</p>}
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className='block text-sm font-medium mb-1' >Messages</label>
                                <textarea
                                    id="formGridAddress"
                                    placeholder="Type your messages here..."
                                    name="messages"
                                    value={values.messages}
                                    onChange={handleChange}
                                    className={`w-full h-40 p-2  ${value && 'bg-gray-800'} border ${errors.messages ? 'border-red-500' : 'border-gray-300'} rounded`}
                                />
                                {errors.messages && <p className='text-red-500 text-xs italic mt-1'>{errors.messages}</p>}
                            </div>
                            <div className='grid gap-2 mt-6'>
                                <button
                                    className='py-2  px-4 bg-transparent border border-main text-dark-grey-900 font-semibold rounded hover:bg-main hover:text-black transition-colors duration-200'
                                    type="submit">
                                    Submit
                                </button>
                            </div>
                        </formik.Form>
                    )}
                </Formik>
            </>
        </>

    );
}

export default ContactForm;