import React, { useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Options for the toast notifications
const defaultOptions = {
    position: "top-right",
    autoClose: 2000,
    closeOnClick: true,
    type: 'default'
};

const Toast = () => {
    // Laravel flash message object
    const { flash } = usePage().props;

    useEffect(() => {
        const notify = (type, message) => {
            // Create a copy of the default options and set the type of notification
            const options = { ...defaultOptions, type };

            toast(message, options);
        };

        // Trigger notifications based on the flash messages
        if (flash.success) {
            notify('success', flash.success);
        }

        if (flash.error) {
            notify('error', flash.error);
        }

        if (flash.warning) {
            notify('warning', flash.warning);
        }

        if (flash.info) {
            notify('info', flash.info);
        }
    }, [flash]); // Only run this effect when `flash` changes

    return <ToastContainer />;
};

export default Toast;
