<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Organization;
use App\Models\OrganizationRole;
use App\Enums\OrganizationRoleEnum;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;

class RegisteredUserController extends Controller
{
    public function create()
    {
        return Inertia::render('Auth/Register', [
            'organizations' => Organization::all(['id', 'name']),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'registration_type' => 'required|in:new_org,join_org',
            'organization_name' => 'required_if:registration_type,new_org|string|max:255',
            'organization_id' => 'required_if:registration_type,join_org|exists:organizations,id',
        ]);

        $isOwner = $request->registration_type === 'new_org';

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'status' => $isOwner ? 'pending' : 'active',
        ]);

        if ($isOwner) {
            $organization = Organization::create([
                'name' => $request->organization_name,
                'status' => 'pending',
            ]);

            $ownerRole = OrganizationRole::where('slug', OrganizationRoleEnum::OWNER->value)->first();
            if ($ownerRole) {
                $user->organizations()->attach($organization->id, ['organization_role_id' => $ownerRole->id]);
            }
            
            return redirect()->route('login')->with('status', 'Your registration is pending Super Admin approval.');
        } else {
            $memberRole = OrganizationRole::where('slug', OrganizationRoleEnum::MEMBER->value)->first();
            if ($memberRole) {
                $user->organizations()->attach($request->organization_id, ['organization_role_id' => $memberRole->id]);
            }
            
            auth()->login($user);
            return redirect()->route('dashboard');
        }
    }
}
