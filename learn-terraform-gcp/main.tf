provider "aws" {
  access_key = "<AWS_ACCESS_KEY>"
  secret_key = "<AWS_SECRET_KEY>"
  region     = "<AWS_REGION>"
}

resource "aws_instance" "web" {
  ami           = "ami-xxxxxxxxxxxxxxxxx"  # Replace with a suitable AMI ID
  instance_type = "t2.micro"  # Choose an appropriate instance type
  key_name      = "your-key-pair"  # Replace with your SSH key pair
  subnet_id     = "subnet-xxxxxxxx"  # Replace with a suitable subnet ID
  associate_public_ip_address = true

  user_data = <<-EOF
              #!/bin/bash
              # Install and configure Django and any other necessary software
              # You can add your deployment script here
              EOF

  tags = {
    Name = "Django Backend"
  }
}

# You can use the aws_security_group and aws_key_pair resources as needed.
