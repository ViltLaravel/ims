<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Supplier\SupplierModel;
use App\Http\Requests\StoreSupplierModelRequest;
use App\Http\Requests\UpdateSupplierModelRequest;

class SupplierModelController extends Controller
{
    function __construct() {
        $this->supplier = new SupplierModel();
    }

    public function index()
    {
        $data = $this->supplier->allSupplier();
        return Inertia::render('Supplier/Index', $data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSupplierModelRequest $request)
    {
        try {
            $data = $this->supplier->createSupplier($request->validated());
            if($data) {
                return redirect()->route('supplier.index');
            }
            return redirect()->route('');
        } catch (\Throwable $th) {
            return redirect()->route('', $th->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(SupplierModel $supplierModel)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(SupplierModel $supplierModel)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSupplierModelRequest $request, SupplierModel $supplierModel)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SupplierModel $supplierModel)
    {
        //
    }
}
