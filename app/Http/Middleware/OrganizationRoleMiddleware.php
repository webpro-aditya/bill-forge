<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class OrganizationRoleMiddleware
{
    public function handle(Request $request, Closure $next, string $role): Response
    {
        $organizationId = $request->route('organization') ?? $request->header('X-Organization-ID');
        
        if (!auth()->check() || !$organizationId || !auth()->user()->hasOrganizationRole($organizationId, $role)) {
            abort(403, 'Unauthorized action.');
        }

        return $next($request);
    }
}
