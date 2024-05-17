import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import { useForm, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import Modal from "@/Components/Modal";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";

export default function Supplier({ auth }) {
    const { data } = usePage().props;
    const [suppliers, setSuppliers] = useState([]);
    const [modal, setModal] = useState(false);

    const { data: formData, setData, post, processing, errors, reset } = useForm({
        supplier_name: '',
        contact_name: '',
        contact_email: '',
        contact_phone: '',
        address: '',
    });

    const fetchSuppliers = async () => {
        try {
            setSuppliers(data);
        } catch (error) {
            console.error('Error fetching suppliers:', error);
        }
    };

    const title = 'Add New Supplier';

    const showModal = () => {
        setModal(true);
    };

    const closeModal = () => {
        setModal(false);
    };

    const handleCreate = async () => {
        try {
            await post(route('supplier.store'), {
                onSuccess: () => {
                    setModal(false);
                    fetchSuppliers();
                    reset();
                },
                onError: () => {
                    setModal(true)
                }
            });
        } catch (error) {
            console.log('Failed to create supplier:', error);
        }
    };

    useEffect(() => {
        fetchSuppliers();
    }, [data]);

    return (
        <>
            <AuthenticatedLayout user={auth.user}>
                <div className="px-4 sm:px-6 lg:px-8">
                    <div className="sm:flex sm:items-center">
                        <div className="sm:flex-auto">
                            <h1 className="text-base font-semibold leading-6 text-gray-900">Suppliers</h1>
                            <p className="mt-2 text-sm text-gray-700">
                                A list of all the supplier's in your account including their name, contact, email, phone and address.
                            </p>
                        </div>
                        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                            <button onClick={showModal}
                                type="button"
                                className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Add supplier
                            </button>
                        </div>
                    </div>
                    <div className="mt-8 flow-root">
                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-300">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                                    Name
                                                </th>
                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                    Contact Name
                                                </th>
                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                    Email
                                                </th>
                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                    Contact Phone
                                                </th>
                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                    Address
                                                </th>
                                                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                                    <span className="sr-only">Action</span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-white">
                                            {suppliers.map((supplier) => (
                                                <tr key={supplier.id}>
                                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                        {supplier.supplier_name}
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{supplier.contact_name}</td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{supplier.contact_email}</td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{supplier.contact_phone}</td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{supplier.address}</td>
                                                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                        <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                                            Edit<span className="sr-only">, {supplier.name}</span>
                                                        </a>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
            <Modal show={modal} close={closeModal} title={title} submit={handleCreate} disabled={processing}>
                <div>
                    <InputLabel htmlFor="supplier_name" value="Supplier Name" />

                    <TextInput
                        id="supplier_name"
                        name="supplier_name"
                        value={formData.supplier_name}
                        className="mt-1 block w-full"
                        autoComplete="supplier_name"
                        isFocused={true}
                        onChange={(e) => setData('supplier_name', e.target.value)}
                        required
                    />

                    <InputError message={errors.supplier_name} className="mt-2" />
                </div>
                <div>
                    <InputLabel htmlFor="contact_name" value="Contact Name" />

                    <TextInput
                        id="contact_name"
                        name="contact_name"
                        value={formData.contact_name}
                        className="mt-1 block w-full"
                        autoComplete="contact_name"
                        isFocused={true}
                        onChange={(e) => setData('contact_name', e.target.value)}
                        required
                    />

                    <InputError message={errors.contact_name} className="mt-2" />
                </div>
                <div>
                    <InputLabel htmlFor="contact_email" value="Contact Email" />

                    <TextInput
                        id="contact_email"
                        name="contact_email"
                        value={formData.contact_email}
                        className="mt-1 block w-full"
                        autoComplete="contact_email"
                        isFocused={true}
                        onChange={(e) => setData('contact_email', e.target.value)}
                        required
                    />

                    <InputError message={errors.contact_email} className="mt-2" />
                </div>
                <div>
                    <InputLabel htmlFor="contact_phone" value="Contact Phone" />

                    <TextInput
                        id="contact_phone"
                        name="contact_phone"
                        value={formData.contact_phone}
                        className="mt-1 block w-full"
                        autoComplete="contact_phone"
                        isFocused={true}
                        onChange={(e) => setData('contact_phone', e.target.value)}
                        required
                    />

                    <InputError message={errors.contact_phone} className="mt-2" />
                </div>
                <div>
                    <InputLabel htmlFor="address" value="Address" />

                    <TextInput
                        id="address"
                        name="address"
                        value={formData.address}
                        className="mt-1 block w-full"
                        autoComplete="address"
                        isFocused={true}
                        onChange={(e) => setData('address', e.target.value)}
                        required
                    />

                    <InputError message={errors.address} className="mt-2" />
                </div>
            </Modal>
        </>
    )
}
