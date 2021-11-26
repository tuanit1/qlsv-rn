<?php
    require "connection.php";

    $json = file_get_contents('php://input');
    $post_obj = json_decode($json, TRUE);

    if($post_obj['method_name'] == 'method_get_all_student'){
        
        $jsObjAll = array();
        $jsObj_user = array();

        $query = "SELECT student.*, class.name as class_name, class.descript FROM `student`
            INNER JOIN class ON class.id = student.class_id";
        $query_result = mysqli_query($connect, $query);

        while($row = mysqli_fetch_assoc($query_result)){
            $data['id'] = $row['id'];
            $data['name'] = $row['name'];
            $data['birthday'] = $row['birthday'];
            $data['address'] = $row['address'];
            $data['image'] = $row['image'];
            $data['class_id'] = $row['class_id'];
            $data['class_name'] = $row['class_name'];
            $data['description'] = $row['descript'];

            array_push($jsObj_user, $data);
        }

        $jsObjAll['array_student'] = $jsObj_user;

        echo json_encode($jsObjAll);

        die();
    }

    if($post_obj['method_name'] == 'method_get_all_class'){
        $jsObjAll = array();
        $jsObj_class = array();

        $query = "SELECT * FROM `class`";
        $query_result = mysqli_query($connect, $query);

        while($row = mysqli_fetch_assoc($query_result)){
            $data['id'] = $row['id'];
            $data['name'] = $row['name'];
            $data['descript'] = $row['descript'];

            array_push($jsObj_class, $data);
        }

        $jsObjAll['array_class'] = $jsObj_class;

        echo json_encode($jsObjAll);

        die();
    }

    if($post_obj['method_name'] == 'method_update_student'){
        $id = $post_obj['id'];
        $name = $post_obj['name'];
        $class_id = $post_obj['class_id'];
        $birthday = $post_obj['birthday'];
        $address = $post_obj['address'];

        $query = "UPDATE `student` SET `name` = '$name', `birthday` = '$birthday', `address` = '$address', `class_id` = '$class_id' WHERE `student`.`id` = $id";

        if(mysqli_query($connect, $query)){
            echo "success";
        }else{
            echo "fail " .$query;
        }

        die();
    }

    if($post_obj['method_name'] == 'method_add_student'){

        $name = $post_obj['name'];
        $class_id = $post_obj['class_id'];
        $birthday = $post_obj['birthday'];
        $address = $post_obj['address'];

        $query = "INSERT INTO `student` (`id`, `name`, `birthday`, `address`, `image`, `class_id`) VALUES (NULL, '$name', '$birthday', '$address', '', '$class_id')";

        if(mysqli_query($connect, $query)){
            echo "success";
        }else{
            echo "fail " .$query;
        }

        die();
    }

    if($post_obj['method_name'] == 'method_del_student'){
        $id = $post_obj['id'];

        $query = "DELETE FROM student WHERE `id` = $id";

        if(mysqli_query($connect, $query)){
            echo "success";
        }else{
            echo "fail " .$query;
        }

        die();
    }
    
?>