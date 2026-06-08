<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'status',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function platformRoles()
    {
        return $this->belongsToMany(PlatformRole::class, 'user_platform_roles');
    }

    public function organizations()
    {
        return $this->belongsToMany(Organization::class, 'organization_user_roles')
                    ->withPivot('organization_role_id')
                    ->withTimestamps();
    }

    public function organizationRoles($organizationId = null)
    {
        $query = $this->belongsToMany(OrganizationRole::class, 'organization_user_roles')
                      ->withPivot('organization_id')
                      ->withTimestamps();
                      
        if ($organizationId) {
            $query->wherePivot('organization_id', $organizationId);
        }
        
        return $query;
    }

    public function hasPlatformRole($roleSlug)
    {
        return $this->platformRoles()->where('slug', $roleSlug)->exists();
    }

    public function hasOrganizationRole($organizationId, $roleSlug)
    {
        return $this->organizationRoles($organizationId)->where('slug', $roleSlug)->exists();
    }
}
