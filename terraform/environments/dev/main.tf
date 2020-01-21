module "planets" {
  source = "../../infra/planets"
  environment = "${var.environment}"
  write_capacity = 1
  read_capacity = 1
}
