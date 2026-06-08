<?php

namespace App\Enums;

enum OrganizationRoleEnum: string
{
    case OWNER = 'owner';
    case BILLING_MANAGER = 'billing_manager';
    case TEAM_ADMIN = 'team_admin';
    case DEVELOPER = 'developer';
    case MEMBER = 'member';
}
