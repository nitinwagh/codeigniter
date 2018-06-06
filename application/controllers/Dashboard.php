<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Dashboard extends CI_Controller {

    public function index()
    {
        echo 'sdfdsfdsfd';
    }

    public function update($value = "")
    {
        $value = $this->uri->segment(3);
        echo $value;
    }

}
