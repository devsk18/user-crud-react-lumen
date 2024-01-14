<?php

namespace App\Repositories;

use App\Models\User;
use App\Repositories\Interfaces\UserInterface;

class UserRepository implements UserInterface 
{
    /**
     * @return User model
     */
    public function getAllUsersData()
    {
        return User::all();
    }

    /**
     * @param mixed $id
     * 
     * @return User model
     */
    public function getUserData($id)
    {
        return User::find($id);
    }
    
    /**
     * @param mixed $request
     * 
     * @return void
     */
    public function createUser($data)
    {
        User::create($data);
    }
    /**
     * @param mixed $request
     * 
     * @return void
     */
    public function updateUser($data)
    {
        User::upsert(
            [$data],
            ['id'],
            ['first_name', 'last_name', 'email', 'phone', 'dob', 'gender']
        );
    }
    /**
     * @param mixed $id
     * 
     * @return void
     */
    public function deleteUser($id)
    {
        User::destroy($id);
    }
}