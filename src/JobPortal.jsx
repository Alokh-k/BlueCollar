import React, { useState, useEffect } from 'react';
import { Search, MapPin, Briefcase, User, Building2, Phone, Mail, FileText, Camera, CreditCard, Filter, ChevronRight, Menu, X } from 'lucide-react';
import logo from './assets/logo.jpg';

const JobPortal = () => {
    const [view, setView] = useState('landing');
    const [userType, setUserType] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [registrationStep, setRegistrationStep] = useState(1);
    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [jobSeekers, setJobSeekers] = useState([]);
    const [filteredSeekers, setFilteredSeekers] = useState([]);
    const [appliedJobs, setAppliedJobs] = useState([]);
    const [interviews, setInterviews] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [locationFilter, setLocationFilter] = useState('');
    const [roleFilter, setRoleFilter] = useState('');

    const [formData, setFormData] = useState({
        phone: '',
        otp: '',
        firstName: '',
        lastName: '',
        email: '',
        qualification: '',
        languages: '',
        location: '',
        preferredJob: '',
        experience: '',
        locationPreference: '',
        resume: null,
        photo: null,
        idCard: '',
        passport: '',
        companyName: '',
        companyEmail: '',
        plan: null
    });

    useEffect(() => {
        const mockJobs = [
            { id: 1, title: 'Industrial Electrician', company: 'Almen', location: 'Saudi Arabia', type: 'Contract', experience: '5-8 years', description: 'Maintenance and repair of electrical systems in oil rigs.' },
            { id: 2, title: '6G Welder', company: 'Douglas OHI', location: 'Oman', type: 'Full-time', experience: '4-7 years', description: 'Certified welder for pipeline projects.' },
            { id: 3, title: 'Heavy Truck Driver', company: 'Al Turki Enterprises', location: 'UAE', type: 'Full-time', experience: '3-5 years', description: 'Valid GCC license required for heavy transportation.' },
            { id: 4, title: 'Scaffolder', company: 'Galfar Engineering', location: 'Qatar', type: 'Contract', experience: '2-4 years', description: 'Erecting and dismantling scaffolding for construction sites.' },
            { id: 5, title: 'Pipe Fitter', company: 'CCC (Consolidated Contractors)', location: 'Kuwait', type: 'Full-time', experience: '5+ years', description: 'Layout, assembly, and installation of piping systems.' },
            { id: 6, title: 'Construction Labourer', company: 'Larsen & Toubro', location: 'Bahrain', type: 'Full-time', experience: '1-2 years', description: 'General construction work and site assistance.' },
            { id: 7, title: 'Diesel Mechanic', company: 'Petroleum Development Oman', location: 'Oman', type: 'Full-time', experience: '4-6 years', description: 'Repair and maintenance of heavy diesel machinery.' },
            { id: 8, title: 'Mason', company: 'Nesma & Partners', location: 'Saudi Arabia', type: 'Contract', experience: '3-6 years', description: 'Bricklaying and concrete work for infrastructure projects.' }
        ];
        setJobs(mockJobs);
        setFilteredJobs(mockJobs);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const { name } = e.target;
        setFormData(prev => ({ ...prev, [name]: e.target.files[0] }));
    };

    const sendOTP = () => {
        alert('OTP sent to ' + formData.phone);
    };

    const verifyOTP = () => {
        if (formData.otp === '1234') {
            setRegistrationStep(2);
        } else {
            alert('Invalid OTP. Use 1234 for demo');
        }
    };

    const completeRegistration = () => {
        if (userType === 'jobseeker') {
            const newUser = { ...formData, id: Date.now() };
            setCurrentUser(newUser);
            setJobSeekers(prev => [...prev, newUser]);
            setView('jobseeker-dashboard');
        } else {
            setCurrentUser({ ...formData, id: Date.now() });
            setView('company-plan');
        }
    };

    const purchasePlan = (plan) => {
        setCurrentUser(prev => ({ ...prev, plan }));
        setFilteredSeekers(jobSeekers);
        setView('company-dashboard');
    };

    const applyToJob = (jobId) => {
        setAppliedJobs(prev => [...prev, jobId]);
        alert('Application submitted successfully!');
    };

    const scheduleInterview = (seekerId, date) => {
        setInterviews(prev => [...prev, { seekerId, date, status: 'scheduled' }]);
        alert(`Interview scheduled for ${date}`);
    };

    const filterJobs = () => {
        let filtered = jobs;
        if (searchQuery) {
            filtered = filtered.filter(job =>
                job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                job.company.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        if (locationFilter) {
            filtered = filtered.filter(job => job.location === locationFilter);
        }
        if (roleFilter) {
            filtered = filtered.filter(job => job.title.toLowerCase().includes(roleFilter.toLowerCase()));
        }
        setFilteredJobs(filtered);
    };

    const filterSeekers = () => {
        let filtered = jobSeekers;
        if (searchQuery) {
            filtered = filtered.filter(seeker =>
                seeker.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                seeker.preferredJob.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        if (locationFilter) {
            filtered = filtered.filter(seeker => seeker.location === locationFilter);
        }
        setFilteredSeekers(filtered);
    };

    useEffect(() => {
        filterJobs();
    }, [searchQuery, locationFilter, roleFilter]);

    if (view === 'landing') {
        return (
            <div className="min-h-screen bg-white">
                <header className="bg-white shadow-sm border-b">
                    <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <img src={logo} alt="Logo" className="w-16 h-16" />
                            <span className="text-2xl font-bold text-gray-800">Trisect Global </span>
                        </div>
                        <div className="flex space-x-4">
                            <button onClick={() => { setUserType('jobseeker'); setView('login'); }} className="px-6 py-2 text-blue-600 border border-blue-600 rounded hover:bg-blue-50">Job Seeker</button>
                            <button onClick={() => { setUserType('company'); setView('login'); }} className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">For Employers</button>
                        </div>
                    </div>
                </header>

                <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-5xl font-bold mb-4">Find Your Skilled Trade Job</h1>
                        <p className="text-xl mb-8">Opportunities in Oil & Gas, Construction, and more across GCC</p>
                        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-4 flex gap-4">
                            <div className="flex-1 flex items-center border-r px-4">
                                <Search className="text-gray-400 mr-2" />
                                <input type="text" placeholder="Electrician, Welder, Driver, Mason..." className="w-full outline-none text-gray-800" />
                            </div>
                            <div className="flex-1 flex items-center px-4">
                                <MapPin className="text-gray-400 mr-2" />
                                <input type="text" placeholder="Saudi Arabia, Oman, Kuwait..." className="w-full outline-none text-gray-800" />
                            </div>
                            <button className="bg-blue-600 text-white px-8 py-3 rounded hover:bg-blue-700 font-semibold">Search</button>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-16">
                    <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center p-6">
                            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Briefcase className="text-blue-600" size={32} />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Thousands of Jobs</h3>
                            <p className="text-gray-600">Access to thousands of job opportunities across industries</p>
                        </div>
                        <div className="text-center p-6">
                            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <User className="text-blue-600" size={32} />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Easy Profile Setup</h3>
                            <p className="text-gray-600">Quick and simple registration process</p>
                        </div>
                        <div className="text-center p-6">
                            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Building2 className="text-blue-600" size={32} />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Top Companies</h3>
                            <p className="text-gray-600">Connect with leading employers</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (view === 'login') {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-6 text-center">{userType === 'jobseeker' ? 'Job Seeker' : 'Company'} Login</h2>

                    {registrationStep === 1 && (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Phone Number</label>
                                <div className="flex">
                                    <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 bg-gray-50 rounded-l">+91</span>
                                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="flex-1 border border-gray-300 rounded-r px-4 py-2" placeholder="Enter phone number" />
                                </div>
                            </div>
                            <button onClick={sendOTP} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Send OTP</button>

                            <div>
                                <label className="block text-sm font-medium mb-2">Enter OTP</label>
                                <input type="text" name="otp" value={formData.otp} onChange={handleInputChange} className="w-full border border-gray-300 rounded px-4 py-2" placeholder="Enter OTP (Use 1234)" />
                            </div>
                            <button onClick={verifyOTP} className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">Verify OTP</button>
                        </div>
                    )}

                    {registrationStep === 2 && userType === 'jobseeker' && (
                        <div className="space-y-4 max-h-96 overflow-y-auto">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">First Name*</label>
                                    <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className="w-full border border-gray-300 rounded px-4 py-2" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Last Name*</label>
                                    <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className="w-full border border-gray-300 rounded px-4 py-2" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Email</label>
                                <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full border border-gray-300 rounded px-4 py-2" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Qualification*</label>
                                <select name="qualification" value={formData.qualification} onChange={handleInputChange} className="w-full border border-gray-300 rounded px-4 py-2">
                                    <option value="">Select</option>
                                    <option value="10th Pass">10th Pass</option>
                                    <option value="12th Pass">12th Pass</option>
                                    <option value="ITI / Diploma">ITI / Diploma</option>
                                    <option value="Graduate">Graduate</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Languages Known*</label>
                                <input type="text" name="languages" value={formData.languages} onChange={handleInputChange} className="w-full border border-gray-300 rounded px-4 py-2" placeholder="e.g., English, Hindi" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Location*</label>
                                <input type="text" name="location" value={formData.location} onChange={handleInputChange} className="w-full border border-gray-300 rounded px-4 py-2" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Preferred Job*</label>
                                <input type="text" name="preferredJob" value={formData.preferredJob} onChange={handleInputChange} className="w-full border border-gray-300 rounded px-4 py-2" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Experience (years)*</label>
                                <input type="number" name="experience" value={formData.experience} onChange={handleInputChange} className="w-full border border-gray-300 rounded px-4 py-2" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Location Preference*</label>
                                <input type="text" name="locationPreference" value={formData.locationPreference} onChange={handleInputChange} className="w-full border border-gray-300 rounded px-4 py-2" placeholder="e.g., Bangalore, Mumbai" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Resume</label>
                                <input type="file" name="resume" onChange={handleFileChange} className="w-full border border-gray-300 rounded px-4 py-2" accept=".pdf,.doc,.docx" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Photo</label>
                                <input type="file" name="photo" onChange={handleFileChange} className="w-full border border-gray-300 rounded px-4 py-2" accept="image/*" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">ID Card Details</label>
                                <input type="text" name="idCard" value={formData.idCard} onChange={handleInputChange} className="w-full border border-gray-300 rounded px-4 py-2" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Passport Details</label>
                                <input type="text" name="passport" value={formData.passport} onChange={handleInputChange} className="w-full border border-gray-300 rounded px-4 py-2" />
                            </div>

                            <button onClick={completeRegistration} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Complete Registration</button>
                        </div>
                    )}

                    {registrationStep === 2 && userType === 'company' && (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Company Name*</label>
                                <input type="text" name="companyName" value={formData.companyName} onChange={handleInputChange} className="w-full border border-gray-300 rounded px-4 py-2" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Company Email*</label>
                                <input type="email" name="companyEmail" value={formData.companyEmail} onChange={handleInputChange} className="w-full border border-gray-300 rounded px-4 py-2" />
                            </div>

                            <button onClick={completeRegistration} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Continue</button>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    if (view === 'company-plan') {
        return (
            <div className="min-h-screen bg-gray-50 p-4">
                <div className="container mx-auto max-w-5xl">
                    <h2 className="text-3xl font-bold text-center mb-8">Choose Your Plan</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { name: 'Basic', duration: '1 Month', profiles: 50, price: '₹5,000' },
                            { name: 'Professional', duration: '3 Months', profiles: 200, price: '₹15,000' },
                            { name: 'Enterprise', duration: '1 Year', profiles: 1000, price: '₹50,000' }
                        ].map((plan, idx) => (
                            <div key={idx} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
                                <h3 className="text-2xl font-bold mb-4 text-center">{plan.name}</h3>
                                <div className="text-center mb-6">
                                    <p className="text-4xl font-bold text-blue-600">{plan.price}</p>
                                    <p className="text-gray-600">{plan.duration}</p>
                                </div>
                                <ul className="space-y-3 mb-6">
                                    <li className="flex items-center"><ChevronRight className="text-green-500 mr-2" size={20} /> Access to {plan.profiles} profiles</li>
                                    <li className="flex items-center"><ChevronRight className="text-green-500 mr-2" size={20} /> Advanced filters</li>
                                    <li className="flex items-center"><ChevronRight className="text-green-500 mr-2" size={20} /> Direct contact</li>
                                    <li className="flex items-center"><ChevronRight className="text-green-500 mr-2" size={20} /> Priority support</li>
                                </ul>
                                <button onClick={() => purchasePlan(plan)} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Purchase Plan</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (view === 'jobseeker-dashboard') {
        return (
            <div className="min-h-screen bg-gray-50">
                <header className="bg-white shadow-sm border-b">
                    <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <img src={logo} alt="Logo" className="w-16 h-16" />
                            <span className="text-2xl font-bold text-gray-800">Trisect Global Blue Collar Job Portal</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-gray-700">Welcome, {currentUser.firstName}</span>
                            <button onClick={() => setView('landing')} className="px-4 py-2 text-blue-600 border border-blue-600 rounded hover:bg-blue-50">Logout</button>
                        </div>
                    </div>
                </header>

                <div className="bg-blue-600 text-white py-8">
                    <div className="container mx-auto px-4">
                        <h1 className="text-3xl font-bold mb-4">Find Your Perfect Job</h1>
                        <div className="max-w-4xl bg-white rounded-lg shadow-lg p-4 flex flex-wrap gap-4">
                            <div className="flex-1 min-w-[200px] flex items-center border-r px-4">
                                <Search className="text-gray-400 mr-2" />
                                <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search jobs..." className="w-full outline-none text-gray-800" />
                            </div>
                            <div className="flex-1 min-w-[150px]">
                                <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} className="w-full px-4 py-2 outline-none text-gray-800 rounded">
                                    <option value="">All Roles</option>
                                    <option value="electrician">Electrician</option>
                                    <option value="welder">Welder</option>
                                    <option value="driver">Driver</option>
                                    <option value="mechanic">Mechanic</option>
                                    <option value="mason">Mason</option>
                                    <option value="plumber">Plumber</option>
                                    <option value="scaffolder">Scaffolder</option>
                                </select>
                            </div>
                            <div className="flex-1 min-w-[150px]">
                                <select value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)} className="w-full px-4 py-2 outline-none text-gray-800 rounded">
                                    <option value="">All Locations</option>
                                    <option value="Saudi Arabia">Saudi Arabia</option>
                                    <option value="Oman">Oman</option>
                                    <option value="Kuwait">Kuwait</option>
                                    <option value="Qatar">Qatar</option>
                                    <option value="UAE">UAE</option>
                                    <option value="Bahrain">Bahrain</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-8">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                        <h3 className="text-green-800 font-semibold mb-2">Registration Successful! 🎉</h3>
                        <p className="text-green-700">Your profile is complete. Start applying to jobs below.</p>
                    </div>

                    <h2 className="text-2xl font-bold mb-6">Recommended Jobs for You</h2>
                    <div className="space-y-4">
                        {filteredJobs.map(job => (
                            <div key={job.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <h3 className="text-xl font-semibold text-gray-800 mb-2">{job.title}</h3>
                                        <p className="text-gray-600 mb-2">{job.company}</p>
                                        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                                            <span className="flex items-center"><MapPin size={16} className="mr-1" /> {job.location}</span>
                                            <span className="flex items-center"><Briefcase size={16} className="mr-1" /> {job.experience}</span>
                                            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded">{job.type}</span>
                                        </div>
                                        <p className="mt-3 text-gray-600">{job.description}</p>
                                    </div>
                                    <button
                                        onClick={() => applyToJob(job.id)}
                                        disabled={appliedJobs.includes(job.id)}
                                        className={`ml-4 px-6 py-2 rounded font-semibold ${appliedJobs.includes(job.id) ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                                    >
                                        {appliedJobs.includes(job.id) ? 'Applied' : 'Apply'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (view === 'company-dashboard') {
        return (
            <div className="min-h-screen bg-gray-50">
                <header className="bg-white shadow-sm border-b">
                    <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <Building2 className="text-blue-600" size={32} />
                            <span className="text-2xl font-bold text-gray-800">{currentUser.companyName}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded">{currentUser.plan.name} Plan</span>
                            <button onClick={() => setView('landing')} className="px-4 py-2 text-blue-600 border border-blue-600 rounded hover:bg-blue-50">Logout</button>
                        </div>
                    </div>
                </header>

                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold mb-6">Find Candidates</h1>

                    <div className="bg-white rounded-lg shadow p-4 mb-6 flex flex-wrap gap-4">
                        <div className="flex-1 min-w-[200px] flex items-center">
                            <Search className="text-gray-400 mr-2" />
                            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search candidates..." className="w-full outline-none" />
                        </div>
                        <div className="flex-1 min-w-[150px]">
                            <select value={locationFilter} onChange={(e) => { setLocationFilter(e.target.value); filterSeekers(); }} className="w-full px-4 py-2 border border-gray-300 rounded">
                                <option value="">All Locations</option>
                                <option value="Saudi Arabia">Saudi Arabia</option>
                                <option value="Oman">Oman</option>
                                <option value="Kuwait">Kuwait</option>
                                <option value="Qatar">Qatar</option>
                                <option value="UAE">UAE</option>
                                <option value="Bahrain">Bahrain</option>
                            </select>
                        </div>
                        <button onClick={filterSeekers} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Filter</button>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredSeekers.map(seeker => (
                            <div key={seeker.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
                                <div className="flex items-center mb-4">
                                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl">
                                        {seeker.firstName[0]}{seeker.lastName[0]}
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="font-semibold text-lg">{seeker.firstName} {seeker.lastName}</h3>
                                        <p className="text-gray-600 text-sm">{seeker.preferredJob}</p>
                                    </div>
                                </div>
                                <div className="space-y-2 text-sm">
                                    <p className="flex items-center text-gray-600"><MapPin size={16} className="mr-2" /> {seeker.location}</p>
                                    <p className="flex items-center text-gray-600"><Briefcase size={16} className="mr-2" /> {seeker.experience} years experience</p>
                                    <p className="text-gray-600"><strong>Qualification:</strong> {seeker.qualification}</p>
                                    <p className="text-gray-600"><strong>Languages:</strong> {seeker.languages}</p>
                                </div>
                                <div className="mt-4 flex gap-2">
                                    <button className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 text-sm">View Profile</button>
                                    <button onClick={() => scheduleInterview(seeker.id, new Date().toLocaleDateString())} className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 text-sm">Schedule</button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredSeekers.length === 0 && (
                        <div className="text-center py-12 text-gray-500">
                            <User size={64} className="mx-auto mb-4 text-gray-300" />
                            <p>No candidates found. Try adjusting your filters.</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return null;
};

export default JobPortal;
