<?php

namespace App\Http\Controllers;

use App\Repositories\UserRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;

class UserController extends Controller
{
    public $userRepo;
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(UserRepository $userRepo)
    {
        $this->userRepo = $userRepo;
    }

    public function index()
    {
        $user = $this->userRepo->getAllUsersData();

        if($user != null) {
            $user->makeHidden(['created_at', 'updated_at']);
        }

        $data = [
            'data' => $user,
            'status' => $user != null ? true : false,
        ];

        return response()->json($data);
    }

    public function show($id)
    {
        $user = $this->userRepo->getUserData($id);

        if($user != null) {
            $user->makeHidden(['created_at', 'updated_at']);
        }

        $data = [
            'data' => $user,
            'status' => $user != null ? true : false,
        ];

        return response()->json($data);
    }
    
    /**
     * @param Request $request
     * 
     * @return json
     */
    public function store(Request $request)
    {
        $rule = array(
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'email' => 'required|email|unique:users',
            'phone' => 'required|numeric|digits:10',
            'gender' => 'required|in:Male,Female',
            'dob' => 'required|date|before:today'
        );

        $request = $this->validate($request, $rule);

        try {
            $this->userRepo->createUser($request);

            return response()->json([
                'message' => 'User created successfully',
                'status' => 'Success'
            ]);

        } catch (\Throwable $th) {

            return response()->json([
                'message' => 'User Creating Failed',
                'status' => 'Failed'
            ]);
        }
    }

    public function update($id, Request $request)
    {
        $rule = array(
            'id' => 'required|exists:users',
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'email' => 'required|email|unique:users,email,'.$id.'id',
            'phone' => 'required|numeric|digits:10',
            'gender' => 'required|in:Male,Female',
            'dob' => 'required|date|before:today'
        );

        $request = $this->validate($request, $rule);

        try {
            $this->userRepo->updateUser($request);

            return response()->json([
                'message' => 'User Edited successfully',
                'status' => 'Success'
            ]);

        } catch (\Throwable $th) {

            return response()->json([
                'message' => 'User Editing Failed',
                'status' => 'Failed'
            ]);
        }
    }

    public function delete($id)
    {
        try {
            $this->userRepo->deleteUser($id);

            return response()->json([
                'message' => 'User Deleted successfully',
                'status' => 'Success'
            ]);

        } catch (\Throwable $th) {

            return response()->json([
                'message' => 'User Deleting Failed',
                'status' => 'Failed'
            ]);
        }
    }
}
