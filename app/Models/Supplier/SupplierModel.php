<?php

namespace App\Models\Supplier;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SupplierModel extends Model
{
    use HasFactory;

    protected $table = 'supplier_models';
    protected $guarded = [];

    public function allSupplier() {
        return $this->paginate(10);
    }

    public function createSupplier($data) {
        $supplier = $this->create($data);
        return $supplier;
    }

    public function deleteSupplier($id) {
        $supplier = $this->find($id);
        if($supplier) {
            return $supplier->delete();
        }
        return false;
    }
}
