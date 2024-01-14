<?php

namespace App\Repositories\Interfaces;


interface UserInterface {
    
    public function getAllUsersData();
    public function getUserData($id);
    public function createUser($data);
    public function updateUser($data);
    public function deleteUser($id);

}