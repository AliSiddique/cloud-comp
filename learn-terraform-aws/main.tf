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
              # Install and configure kubectl
              sudo curl -o /usr/local/bin/kubectl https://amazon-eks.s3.us-west-2.amazonaws.com/1.21.2/2022-07-07/bin/linux/amd64/kubectl
              sudo chmod +x /usr/local/bin/kubectl

              # Configure kubeconfig
              aws eks --region <AWS_REGION> update-kubeconfig --name <EKS_CLUSTER_NAME>

              # Apply Kubernetes manifests
              kubectl apply -f /path/to/frontend-deployment.yaml
              kubectl apply -f /path/to/backend-deployment.yaml
              kubectl apply -f /path/to/db-deployment.yaml
              EOF

  tags = {
    Name = "Django Backend"
  }
}

# You can use the aws_security_group and aws_key_pair resources as needed.
