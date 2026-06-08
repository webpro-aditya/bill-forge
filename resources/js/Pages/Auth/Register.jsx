import { useEffect, useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register({ organizations }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        registration_type: 'new_org', // new_org or join_org
        organization_name: '',
        organization_id: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center p-4 py-12">
            <Head title="Register" />

            <div className="w-full max-w-lg">
                <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                    
                    {/* Decorative Gradients */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500"></div>
                    <div className="absolute -top-32 -left-32 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>

                    <div className="relative z-10">
                        <div className="mb-8 text-center">
                            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                                Create Account
                            </h2>
                            <p className="mt-2 text-sm text-gray-400">
                                Join our platform and manage your billing
                            </p>
                        </div>

                        <form onSubmit={submit} className="space-y-5">
                            
                            {/* Registration Type Selector */}
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <button
                                    type="button"
                                    onClick={() => setData('registration_type', 'new_org')}
                                    className={`py-3 px-4 rounded-xl text-sm font-medium transition-all ${
                                        data.registration_type === 'new_org'
                                            ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg ring-2 ring-emerald-500/50 ring-offset-2 ring-offset-gray-900'
                                            : 'bg-gray-900/50 text-gray-400 hover:bg-gray-800 border border-gray-700'
                                    }`}
                                >
                                    Create Organization
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setData('registration_type', 'join_org')}
                                    className={`py-3 px-4 rounded-xl text-sm font-medium transition-all ${
                                        data.registration_type === 'join_org'
                                            ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg ring-2 ring-cyan-500/50 ring-offset-2 ring-offset-gray-900'
                                            : 'bg-gray-900/50 text-gray-400 hover:bg-gray-800 border border-gray-700'
                                    }`}
                                >
                                    Join Existing
                                </button>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none text-gray-100 placeholder-gray-500"
                                    placeholder="John Doe"
                                    required
                                />
                                {errors.name && <p className="mt-2 text-sm text-red-400">{errors.name}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none text-gray-100 placeholder-gray-500"
                                    placeholder="you@company.com"
                                    required
                                />
                                {errors.email && <p className="mt-2 text-sm text-red-400">{errors.email}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                                    <input
                                        type="password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none text-gray-100 placeholder-gray-500"
                                        placeholder="••••••••"
                                        required
                                    />
                                    {errors.password && <p className="mt-2 text-sm text-red-400">{errors.password}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Confirm</label>
                                    <input
                                        type="password"
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none text-gray-100 placeholder-gray-500"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="pt-4 border-t border-gray-700/50">
                                {data.registration_type === 'new_org' ? (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Organization Name</label>
                                        <input
                                            type="text"
                                            value={data.organization_name}
                                            onChange={(e) => setData('organization_name', e.target.value)}
                                            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none text-gray-100 placeholder-gray-500"
                                            placeholder="Acme Corp"
                                        />
                                        <p className="mt-2 text-xs text-gray-400">You will be designated as the Owner. Your account will require Super Admin approval.</p>
                                        {errors.organization_name && <p className="mt-2 text-sm text-red-400">{errors.organization_name}</p>}
                                    </div>
                                ) : (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Select Organization</label>
                                        <select
                                            value={data.organization_id}
                                            onChange={(e) => setData('organization_id', e.target.value)}
                                            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all outline-none text-gray-100"
                                        >
                                            <option value="">-- Choose an Organization --</option>
                                            {organizations && organizations.map(org => (
                                                <option key={org.id} value={org.id}>{org.name}</option>
                                            ))}
                                        </select>
                                        <p className="mt-2 text-xs text-gray-400">You will join as a basic Member.</p>
                                        {errors.organization_id && <p className="mt-2 text-sm text-red-400">{errors.organization_id}</p>}
                                    </div>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className={`w-full flex justify-center py-3 px-4 mt-6 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white transform transition-all active:scale-95 disabled:opacity-50 ${
                                    data.registration_type === 'new_org' 
                                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 focus:ring-emerald-500'
                                    : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 focus:ring-cyan-500'
                                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900`}
                            >
                                {processing ? 'Registering...' : 'Register Account'}
                            </button>
                        </form>

                        <div className="mt-8 text-center text-sm text-gray-400">
                            Already have an account?{' '}
                            <Link href={route('login')} className="font-medium text-emerald-400 hover:text-emerald-300 transition-colors">
                                Sign in
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
