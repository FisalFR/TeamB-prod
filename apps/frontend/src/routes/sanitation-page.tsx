import { useState } from 'react';
import {SanitationRequest} from "common/src/sanitationRequest.ts";

function Sanitation() {
    const [form, setForm] = useState<SanitationRequest>({
        employeeName: '',
        priority: '',
        location: '',
        serviceType: '',
        quality: '',
        additionalComments: '',
        status: '',
    });
    const [requests, setRequests] = useState<SanitationRequest[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setRequests([...requests, form]);
        setForm({
            employeeName: '',
            priority: '',
            location: '',
            serviceType: '',
            quality: '',
            additionalComments: '',
            status: '',
        });
    };

    return (
        <div className="flex justify-center items-center w-screen flex-col gap-6">
            <div className="p-8 bg-slate-600 w-1/3 rounded-2xl">
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1 items-left">
                            <label className="font-semibold">Name</label>
                            <input name="employeeName" value={form.employeeName} onChange={handleChange}
                                   placeholder="Employee Name" className="rounded-md p-1"/>
                        </div>
                        <div className="flex flex-col gap-1 items-left">
                            <label className="font-semibold">Priority</label>
                            <select name="priority" value={form.priority} onChange={handleChange}
                                    className="rounded-md p-1">
                                <option value="">Select Priority</option>
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                                <option value="Emergency">Emergency</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-1 items-left">
                            <label className="font-semibold">Location</label>
                            <input name="location" value={form.location} onChange={handleChange}
                                   placeholder="Location for Service" className="rounded-md p-1"/>
                        </div>
                        <div className="flex flex-col gap-1 items-left">
                            <label className="font-semibold">Service</label>
                            <select name="serviceType" value={form.serviceType} onChange={handleChange}
                                    className="rounded-md p-1">
                                <option value="">Select Service Type...</option>
                                <option value="Bed Cleaning">Bed Cleaning</option>
                                <option value="Toilet Cleaning">Toilet Cleaning</option>
                                <option value="General Sanitation">General Sanitation</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-1 items-left">
                            <label className="font-semibold">Quality</label>
                            <select name="quality" value={form.quality} onChange={handleChange}
                                    className="rounded-md p-1">
                                <option value="">Select Service Quality...</option>
                                <option value="Rush Job">Rush Job</option>
                                <option value="Simple">Simple</option>
                                <option value="Thoroughgit">Thorough</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-1 items-left">
                            <label className="font-semibold">Comments</label>
                            <textarea name="additionalComments" value={form.additionalComments} onChange={handleChange}
                                      placeholder="Additional Comments" className="h-[80px] rounded-md p-1"/>
                        </div>
                        <div className="flex flex-col gap-1 items-left">
                            <label className="font-semibold">Status</label>
                            <select name="status" value={form.status} onChange={handleChange}
                                    className="rounded-md p-1">
                                <option value="">Select Status</option>
                                <option value="Unassigned">Unassigned</option>
                                <option value="Assigned">Assigned</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Closed">Closed</option>
                            </select>
                        </div>
                        <div className="py-5">
                            <button type="submit" className="bg-yellow-400 w-full">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
                {requests.map((request) => (
                    <div className="p-8 bg-slate-600 w-1/3 rounded-2xl">
                        <div className="flex flex-col gap-4">
                            <h2 className="font-semibold">{request.employeeName}</h2>
                            <p>Priority: <span className="rounded-md p-1">{request.priority}</span></p>
                            <p>Location: <span className="rounded-md p-1">{request.location}</span></p>
                            <p>Service Type: <span className="rounded-md p-1">{request.serviceType}</span></p>
                            <p>Quality: <span className="rounded-md p-1">{request.quality}</span></p>
                            <p>Additional Comments: <span
                                className="h-[80px] rounded-md p-1">{request.additionalComments}</span></p>
                            <p>Status: <span className="rounded-md p-1">{request.status}</span></p>
                        </div>
                    </div>
                ))}
        </div>
    );
}

export default Sanitation;
