import { useState } from "react";
import { AnimatePresence, motion as Motion } from "framer-motion";
import ChangePassword from "./ChangePassword";

export default function Profile() {
    const [showForgot, setShowForgot] = useState(false);
    const [edit, setEdit] = useState(false);

    const [profileData, setProfileData] = useState({
        dob: "01-01-1985",
        phone: "99331 52581",
        email: "siddheswaritelecomghatal@gmail.com",
        address: "Kushpata, Ghatal, West Bengal",
        aadhar: "XXXX XXXX XXXX",
        pan: "ABCDE1234F",
        bcda: "BCDA-XXXX",
        drug: "DL-XXXXXX",
        gst: "GSTIN-XXXX",
    });

    // Profile Image upload state
    const [profileImage, setProfileImage] = useState(
        "https://i.pravatar.cc/150"
    );

    // Profile Image handler
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const imageURL = URL.createObjectURL(file);
        setProfileImage(imageURL);
    };

    const handleSave = () => {
        console.log("Saved Profile Data:", profileData);
        console.log("Saved Documents:", documents);

        // later you can send this to backend / firebase
        // fetch(...) or firebase.firestore().set(...)

        alert("Profile updated successfully!");
        setEdit(false);
    };

    // Documents upload state
    const [documents, setDocuments] = useState({
        aadhar: null,
        pan: null,
        bcda: null,
        drug: null,
        gst: null,
    });

    // 🔴 NEW: document upload handler
    const handleDocumentUpload = (type, file) => {
        if (!file) return;
        setDocuments((prev) => ({
            ...prev,
            [type]: file,
        }));
    };


    return (
        <div className="min-h-screen p-6">
            {/* PROFILE CARD */}
            <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
                {/* HEADER */}
                <div className="bg-linear-to-r from-teal-700 to-green-600 p-6 flex items-center justify-between md:flex-row flex-col gap-4">
                    <div className="flex items-center md:gap-5 gap-2 text-white">
                        <div className="relative group">
                            <img src={profileImage} alt="Profile" className="h-20 w-20 rounded-full border-4 border-white object-cover" />
                            {edit && (
                                <label className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition">
                                    <i className="fas fa-camera text-white"></i>
                                    <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                                </label>
                            )}
                        </div>
                        <div>
                            <h2 className="text-xl md:text-2xl font-semibold">Prasanta Kumar Adak</h2>
                            <p className=" text-xs md:text-sm opacity-90">Siddheswari Distributor</p>
                            <p className="text-xs opacity-80">Kushpata, Ghatal</p>
                        </div>
                    </div>

                    <button onClick={() => setEdit(!edit)} className="bg-white text-teal-700 px-4 py-2 text-xs md:text-sm rounded-lg font-semibold hover:bg-teal-50 transition">
                        <i className="fas fa-pen mr-2"></i>
                        {edit ? "Cancel" : "Edit Profile"}
                    </button>
                </div>

                {/* BODY */}
                <div className="p-6">
                    {/* BASIC INFO */}
                    <h3 className="text-lg font-semibold mb-4 border-b pb-2">Personal & Business Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                        <ProfileField label="Date of Birth:" name="dob" value={profileData.dob} edit={edit} onChange={(name, value) =>setProfileData((prev) => ({ ...prev, [name]: value }))}/>
                        <ProfileField label="Phone Number:" name="phone" value={profileData.phone} edit={edit} onChange={(name, value) =>setProfileData((prev) => ({ ...prev, [name]: value }))}/>
                        <ProfileField label="Email:" name="email" value={profileData.email} edit={edit} onChange={(name, value) =>setProfileData((prev) => ({ ...prev, [name]: value }))}/>
                        <ProfileField label="Address:" name="address" value={profileData.address} edit={edit} onChange={(name, value) =>setProfileData((prev) => ({ ...prev, [name]: value }))}/>
                        
                        <ProfileField label="Aadhar No:" name="aadhar" value={profileData.aadhar} edit={edit} onChange={(name, value) =>setProfileData((prev) => ({ ...prev, [name]: value }))}/>
                        <ProfileField label="PAN No:" name="pan" value={profileData.pan} edit={edit} onChange={(name, value) =>setProfileData((prev) => ({ ...prev, [name]: value }))}/>
                        <ProfileField label="BCDA No:" name="bcda" value={profileData.bcda} edit={edit} onChange={(name, value) =>setProfileData((prev) => ({ ...prev, [name]: value }))}/>
                        <ProfileField label="Drug Licence No:" name="drug" value={profileData.drug} edit={edit} onChange={(name, value) =>setProfileData((prev) => ({ ...prev, [name]: value }))}/>
                        <ProfileField label="GSTIN No:" name="gst" value={profileData.gst} edit={edit} onChange={(name, value) =>setProfileData((prev) => ({ ...prev, [name]: value }))}/>
                    </div>

                    {/* DOCUMENTS */}
                    <h3 className="text-lg font-semibold mt-10 mb-4 border-b pb-2">Uploaded Documents</h3>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center text-sm">
                        <DocumentCard label="Aadhar" file={documents.aadhar} edit={edit} onUpload={(file) => handleDocumentUpload("aadhar", file)}/>
                        <DocumentCard label="PAN" file={documents.pan} edit={edit} onUpload={(file) => handleDocumentUpload("pan", file)}/>
                        <DocumentCard label="BCDA" file={documents.bcda} edit={edit} onUpload={(file) => handleDocumentUpload("bcda", file)}/>
                        <DocumentCard label="Drug Licence" file={documents.drug} edit={edit} onUpload={(file) => handleDocumentUpload("drug", file)}/>
                        <DocumentCard label="GSTIN" file={documents.gst} edit={edit} onUpload={(file) => handleDocumentUpload("gst", file)}/>
                    </div>

                    {/* SAVE BUTTON */}
                    {edit && (
                        <div className="mt-6 flex gap-4 justify-end">
                            <button onClick={handleSave} className="bg-teal-700 text-white px-6 py-2 rounded-lg hover:bg-teal-800 transition">Save Changes</button>
                            <button onClick={() => setEdit(false)} className="border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-100">Cancel</button>
                        </div>
                    )}

                    {/* CHANGE PASSWORD */}
                    <div className="mt-8 text-center">
                        <button className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition" onClick={() => setShowForgot(true)}>
                        <i className="fas fa-lock mr-2"></i>Change Password</button>
                    </div>
                    <AnimatePresence>
                        {showForgot && (
                            <ChangePassword onClose={() => setShowForgot(false)} />
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

/* -------- SMALL REUSABLE FIELD -------- */
function ProfileField({ label, value, name, edit, onChange }) {
    return (
        <div>
            <label className="block text-gray-600 mb-1">{label}</label>
            {edit ? (
                <input value={value} onChange={(e) => onChange(name, e.target.value)} className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 outline-none"/>
            ) : (
                <p className="font-medium">{value}</p>
            )}
        </div>
    );
}

function DocumentCard({ label, file, edit, onUpload }) {

    const handlePreview = () => {
        if (!file) return;
        const url = URL.createObjectURL(file);
        window.open(url, "_blank");
    };

    const handleDownload = (e) => {
        e.stopPropagation(); // 🔥 VERY IMPORTANT
        if (!file) return;

        const url = URL.createObjectURL(file);
        const a = document.createElement("a");
        a.href = url;
        a.download = file.name;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div
            onClick={file ? handlePreview : undefined}
            className={`bg-gray-100 rounded-lg p-3 transition cursor-pointer
            ${file ? "hover:bg-gray-200 hover:shadow-md" : ""}`}
        >
            <div className="h-20 bg-white rounded mb-2 flex items-center justify-center text-gray-400">
                <i className="far fa-file-alt text-2xl"></i>
            </div>

            <p className="font-medium">{label}</p>

            {file && (
                <p className="text-xs text-green-600 mt-1 truncate">
                    {file.name}
                </p>
            )}

            {/* ⬇️ DOWNLOAD */}
            {file && (
                <button
                    onClick={handleDownload}
                    className="mt-1 text-xs text-blue-600 hover:underline"
                >
                    Download
                </button>
            )}

            {/* ⬆️ UPLOAD / REPLACE */}
            {edit && (
                <label
                    onClick={(e) => e.stopPropagation()} // 🔥 STOP PREVIEW
                    className="mt-2 block text-xs text-teal-700 cursor-pointer hover:underline"
                >
                    {file ? "Replace" : "Upload"}
                    <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        hidden
                        onChange={(e) => onUpload(e.target.files[0])}
                    />
                </label>
            )}
        </div>
    );
}
